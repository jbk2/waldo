class Api::UsersController < ApplicationController
  allow_unauthenticated_access only: %i[ create ]

  def create
    @user = User.new(user_params)
    if @user.save
      render json: {
        success: true,
        message: "User created successfully",
        data: { user: @user }
      }
    else
      render json: {
        success: false,
        message: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:email_address, :password, :password_confirmation)
  end
end