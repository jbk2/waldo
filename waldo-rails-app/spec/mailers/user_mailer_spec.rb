require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "confirmation_email" do
    let(:mail) { UserMailer.with(email: 'to@example.org', username: 'test1').confirmation_email }

    it "renders the headers" do
      expect(mail.subject).to eq("Welcome to Waldo app")
      expect(mail.to).to eq(["to@example.org"])
      expect(mail.from).to eq(["james@bibble.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Hi")
    end
  end

end
