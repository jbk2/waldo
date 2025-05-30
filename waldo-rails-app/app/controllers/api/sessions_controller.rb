class Api::SessionsController < ApplicationController
  skip_forgery_protection

  allow_unauthenticated_access only: %i[ create show ]

  def create
    if user = User.authenticate_by(params.permit(:email_address, :password))
      start_new_session_for user
      render json: { user: user, authenticated: true }
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def show
    # unauthenticated access is allowed to call this action so session is not set,
    # therefore we need to resume the session in order to get the current user
    resume_session 
    puts "cookies.signed[:session_id]: #{cookies.signed[:session_id].inspect}"
    puts "heres the current_user", current_user.inspect
    puts "heres the session[:user_id]", session[:user_id]
    puts "heres the session", session.inspect
    if current_user
      render json: { authenticated: true, user: current_user }
    else
      render json: { authenticated: false, error: "Not logged in" }, status: :unauthorized
    end
  end

end