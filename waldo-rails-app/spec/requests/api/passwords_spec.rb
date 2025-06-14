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
    let(:user) { users(:one) }
    
    # before do
    #   post "/api/passwords", params: { email_address: user.email_address }
    #   user.reload
    # end
    
    context "with valid token & password" do
      it "returns a successful response" do
        original_password_digest = user.password_digest
        patch "/api/passwords/#{user.password_reset_token}", params: {
          password: 'newpassword',
          password_confirmation: 'newpassword'
        }
        
        # puts("password reset token #{user.password_reset_token}")
        # puts("response status #{response.status}")
        # puts("response message #{response.message}")
        
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["notice"]).to eq('Password has been successfully reset')

        user.reload
        expect(user.password_digest).not_to eq(original_password_digest)
      end
    end
  end
end