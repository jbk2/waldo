class Api::UsersController < ApplicationController
  skip_forgery_protection
  allow_unauthenticated_access only: %i[ create ]

  def create
    @user = User.new(user_params)
    if @user.save
      render json: { user: @user, notice: "User created successfully" }
    else
      render json: { errors: @user.errors.full_messages, status: :unprocessable_entity }
    end
  end

  private
  def user_params
    params.require(:user).permit(:email_address, :password, :password_confirmation)
  end
end