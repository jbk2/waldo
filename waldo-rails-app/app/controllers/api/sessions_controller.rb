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
    if Current.session.user
      render json: { authenticated: true, user: Current.session.user }
    else
      render json: { authenticated: false, error: "Not logged in" }, status: :unauthorized
    end
  end

end