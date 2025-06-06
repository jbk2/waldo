class ApplicationController < ActionController::Base
  include Authentication
  protect_from_forgery with: :exception

  private
  def verified_request?
    origins = Rails.application.credentials.trusted_origins || []
    valid = super || origins.include?(request.origin)
    Rails.logger.warn("Blocked CSRF request from #{request.origin}") unless valid
    valid
  end

end