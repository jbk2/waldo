# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    if Rails.env.development?
      origins "http://localhost:5173"
    elsif Rails.env.production?
      puts "You're in production you must set the origin in the frontend app"
      raise "You're in production you must set the origin in the frontend app"
      # origins "http://waldo-react-app-container"
      # origins Rails.credentials.frontend_url
    end

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
