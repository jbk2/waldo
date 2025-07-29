class Api::UsersController < ApplicationController
  allow_unauthenticated_access only: %i[ create ]

  def create
    @user = User.new(user_params)
    if @user.save
      render json: {
        message: "User created successfully",
        user: @user
      }
    else
      render json: {
        message: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email_address, :password, :password_confirmation)
  end
end