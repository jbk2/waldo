require 'rails_helper'

RSpec.describe User, type: :model do
  fixtures :users
  
  describe 'email normalisation' do
    it "downcases any given email addresses before saving" do
      user = User.new(email_address: "ORIGINALLY-UPCASE@TEST.COM", password: "password")
      user.save
      expect(user.email_address).not_to eq("ORIGINALLY-UPCASE@TEST.COM")
      expect(user.email_address).to eq("originally-upcase@test.com")
    end
  end
end
