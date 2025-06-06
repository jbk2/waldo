Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  
  resource :session
  resources :passwords, param: :token

  root "images#new"

  resources :users, only: [:new, :create, :edit]
  resources :images, only: [:new, :create, :show]

  namespace :api do
    resource :session, only: [:create, :show, :destroy]
    resource :user, only: [:create]
  end

end
