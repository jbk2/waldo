class Api::PasswordsController < ApplicationController
  allow_unauthenticated_access only: %i[ create update ]
  before_action :set_user_by_token, only: %i[ update ]

  def create
    email_address = password_params[:email_address]
    if user = User.find_by(email_address: email_address)
      PasswordsMailer.reset(user).deliver_later
      render json: { notice: "Password reset email sent" }
    else
      render json: {
        error: "Failed to find user with #{email_address}"
      }, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(params.permit(:password, :password_confirmation))
      render json: { notice: "Password has been successfully reset" }
    else
      render json: { error: "Passwords did not match." }
    end
  end

  private
  def set_user_by_token
    @user = User.find_by_password_reset_token!(params[:token])
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    redirect_to new_password_path, alert: "Password reset link is invalid or has expired."
  end

  def password_params
    params.permit(:email_address)
  end
end