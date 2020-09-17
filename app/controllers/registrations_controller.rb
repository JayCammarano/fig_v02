class RegistrationsController < ApplicationController
  wrap_parameters false

  def create
      user = User.new(
      email: params['user']['email'],
      password: params['user']['password'],
      password_confirmation: params['user']['password_confirmation']
    )
    
    if user.save
      session[:user_id] = user.id 
      render json: {
        status: :created,
        user: user
      }
    else
      error = {
      error: user.errors.full_messages,
      status: 400
    }
    render :json => error, :status => :bad_request
    end
  end
end