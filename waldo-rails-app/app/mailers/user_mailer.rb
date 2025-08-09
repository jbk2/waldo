class UserMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.new.subject
  #
  def confirmation_email
    user = params[:user]
    @username = user.username
    mail to: user.email_address, subject: "Welcome to Waldo app"
  end
end
