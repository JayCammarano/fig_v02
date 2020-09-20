class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  require 'carrierwave/processing/mini_magick'

end
