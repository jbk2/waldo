Rails.application.config.session_store :cookie_store,
  key: "_waldo_rails_appsession",
  same_site: :lax,
  secure: Rails.env.production?
