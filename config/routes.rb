Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: 'sessions#logged_in'

  get '/login', to: "static#index"
  get 'signup', to: "static#index"
  get '/artists', to: "static#index"
  get '/artists/:id', to: 'static#index'
  get '/artists/:artistid/releases/:id', to: 'static#index'

  get '/dashboard', to: "static#index"
  root 'static#index'
  resources :admin, only: [:index]
  namespace :api do
    namespace :v1 do
      resources :artists, only: [:index, :create, :new, :show, :update, :discogs] do
        post 'discogs'
        resources :releases, only: [:show, :create, :new, :update]
      end
    end
  end  
end
