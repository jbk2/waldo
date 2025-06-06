class Api::SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ create ]

  def create
    if user = User.authenticate_by(params.permit(:email_address, :password))
      start_new_session_for user
      render json: { user: user, authenticated: true, notice: "Successfully logged in" }
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

  def destroy
    begin
      terminate_session
      render json: { notice: 'successfully logged out' }
    rescue => e
      render json: { error: "Failed to log out: #{e.message}" }, status: :internal_server_error
    end
  end

end