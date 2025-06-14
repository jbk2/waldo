require 'rails_helper'

RSpec.describe "Api::Passwords", type: :request do
  fixtures :users

  describe "POST /api/passwords" do
    context "with valid email" do
      it "sends a password reset email" do        
        post "/api/passwords", params: { email_address: "one@example.com"}
        
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["notice"]).to eq('Password reset email sent')
      end
    end
  end

  describe "PATCH /api/passwords" do
    
  end
end