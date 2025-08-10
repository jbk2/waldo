# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/user_mailer/confirmation_email
  def confirmation_email
    UserMailer.with(email: 'test@email.com', username: 'preview_username').confirmation_email
  end

end
