class Api::SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ create show ]

  def create
    user = User.find_by(email_address: params[:email_address])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { user: user }
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def show
    if current_user
      render json: { authenticated: true, user: current_user }
    else
      render json: { authenticated: false, error: "Not logged in" }, status: :unauthorized
    end
  end

end