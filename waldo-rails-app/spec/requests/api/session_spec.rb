require 'rails_helper'

RSpec.describe 'Sessions API', type: :request do
  fixtures :users

  describe "POST api/session" do
    context "login with valid params" do
      it "returns successful response, notice & user" do
        user = users(:one)

        post '/api/session', params: {
          email_address: user.email_address,
          password: 'Password12!'
        }

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['message']).to eq("Successfully logged in")
        expect(json['user']['email_address']).to eq(user.email_address)
      end
    end
    
    context "login with invalid params" do
      context 'with am invalid email' do
        it "returns unauthorized status and appropriate failure notice" do
          user = users(:one)
  
          post '/api/session', params: {
            email_address: 'non-user@example.com',
            password: 'Password12!'
          }
  
          expect(response).to have_http_status(:unauthorized)
          json = JSON.parse(response.body)
          expect(json['message']).to eq("Invalid email or password")
        end  
      end

      context 'with an incorrect password' do
        it "returns unauthorized status and appropriate failure notice" do
          user = users(:one)
  
          post '/api/session', params: {
            email_address: user.email_address,
            password: 'incorrect-password'
          }
  
          expect(response).to have_http_status(:unauthorized)
          json = JSON.parse(response.body)
          expect(json['message']).to eq("Invalid email or password")
        end  
      end
    end
  end
end