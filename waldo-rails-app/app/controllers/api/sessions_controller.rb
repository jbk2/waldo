class Api::SessionsController < ApplicationController
  skip_forgery_protection
  allow_unauthenticated_access only: %i[ create ]

  def create
    if user = User.authenticate_by(params.permit(:email_address, :password))
      start_new_session_for user
      render json: { user: user, authenticated: true }
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def show
    # puts "cookies.signed[:session_id]: #{cookies.signed[:session_id].inspect}"
    # puts "heres the current_user", current_user.inspect
    if current_user
      render json: { authenticated: true, user: current_user }
    else
      render json: { authenticated: false, error: "Not logged in" }, status: :unauthorized
    end
  end

end