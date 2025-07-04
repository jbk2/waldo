require 'rails_helper'

RSpec.describe 'Users API', type: :request do
  fixtures :users
  
  context "with valid params" do
    describe "Sign up - post to /api/users" do
      it "returns successful json response, containing user object" do
        post '/api/users', params: {
          user: {
            email_address: 'new@example.com',
            password: 'Password12!',
            password_confirmation: 'Password12!'
          }
        }
        expect(response).to have_http_status(:ok)
      end
    end
  end

  context "with duplicate user email" do
    describe "Sign up - post to /api/users" do
      it "returns unsuccessful json response with error message" do
        post '/api/users', params: {
          user: {
            email_address: 'one@example.com',
            password: 'Password23!',
            password_confirmation: 'Password23!'
          }
        }
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['message']).to eq(['Email address has already been taken'])
      end
    end
  end
end