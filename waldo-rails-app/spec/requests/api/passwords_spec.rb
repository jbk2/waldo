require 'rails_helper'

RSpec.describe "Api::Passwords", type: :request do
  fixtures :users

  describe "POST /api/passwords" do
    context "with valid email" do
      it "sends a password reset email" do
        post "/api/passwords", params: { email_address: "one@example.com"}

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json["success"]).to be(true)
        expect(json["message"]).to eq('Password reset email sent')
      end
    end
  end

  describe "PATCH /api/passwords" do
    let(:user) { users(:one) }

    context "with valid token & password" do
      it "returns a successful response" do
        original_password_digest = user.password_digest
        
        patch "/api/passwords/#{user.password_reset_token}", params: {
          password: 'NewPassword12!',
          password_confirmation: 'NewPassword12!'
        }

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json["success"]).to be(true)
        expect(json["message"]).to eq('Password has been successfully reset')
        user.reload
        expect(user.password_digest).not_to eq(original_password_digest)
      end

      it "allows login with the newly set password" do
        patch "/api/passwords/#{user.password_reset_token}", params: {
          password: 'NewPassword12!',
          password_confirmation: 'NewPassword12!'
        }

        post '/api/session', params: {
          email_address: 'one@example.com',
          password: 'NewPassword12!'
        }

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json).to include('success', 'data')
        expect(json['success']).to be(true)
        expect(json['message']).to eq("Successfully logged in")
        expect(json['data']['user']['email_address']).to eq(user.email_address)
      end
    end

    context 'with non matching passwords' do
      it 'returns an error' do
        patch "/api/passwords/#{user.password_reset_token}", params: {
          password: 'NewPassword12!',
          password_confirmation: 'Different12!'
        }

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['success']).to be(false)
        expect(json['message']).to eq('Passwords did not match')
      end
    end

    context "with an invalid token" do
      it "returns an error" do
        patch "/api/passwords/invalid_token", params: {
          password: 'NewPassword12!',
          password_confirmation: 'NewPassword12!'
        }

        expect(response).to have_http_status(:not_found)
        json = JSON.parse(response.body)
        expect(json['success']).to be(false)
        expect(json['message']).to eq('Password reset link is invalid or has expired')
      end 
    end
  end
end