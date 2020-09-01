Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: 'sessions#logged_in'

  get '/login', to: "static#index"
  get 'signup', to: "static#index"
  get '/dashboard', to: "static#index"
  root 'static#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
