Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  root "images#new"

  resources :passwords, param: :token
  resources :users, only: [:new, :create, :edit]
  resource :session, only: [:new, :create, :destroy]
  resources :images, only: [:new, :create, :show]

  namespace :api do
    resource :session, only: [:create, :show, :destroy]
    resources :users, only: [:create]
    resources :passwords, param: :token, only: [:create, :update]
    resources :images, only: [:index] do
      get 'by_title/:image_title', on: :collection, action: :by_title
    end
    resources :games, only: [:create]

    # Test endpoints (only in test environment)
    if Rails.env.test?
      post 'test/load_user_fixtures'
      post 'test/cleanup'
      get 'test/user_fixtures'
      get 'test/environment_check'
      get 'test/generate_password_reset_token'
    end
  end
end
