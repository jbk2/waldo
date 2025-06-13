class Api::PasswordsController < ApplicationController
  allow_unauthenticated_access only: %i[ create ]


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
    email_address = params.permit(:email_address)[:email_address]
  end

  private
  def password_params
    params.permit(:email_address)
  end
end