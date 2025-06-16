class Api::SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ create ]

  def create
    if user = User.authenticate_by(params.permit(:email_address, :password))
      start_new_session_for user
      render json: {
        success: true,
        message: "Successfully logged in",
        data: { user: user, authenticated: true }
      }
    else
      render json: { 
        success: false,
        message: "Invalid email or password"
      }, status: :unauthorized
    end
  end

  def show
    if Current.session.user
      render json: {
        success: true,
        data: { authenticated: true,
          user: Current.session.user
        }
      }
    else
      render json: {
        success: false,
        message: "Not logged in"
      }, status: :unauthorized
    end
  end

  def destroy
    begin
      terminate_session
      render json: {
        success: true,
        message: 'successfully logged out'
      }
    rescue => e
      render json: {
        success: false,
        message: "Failed to log out: #{e.message}"
      }, status: :internal_server_error
    end
  end

end