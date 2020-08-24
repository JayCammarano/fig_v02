class StaticController < ApplicationController
  def index
  end

  protect_from_forgery unless: -> { request.format.json? }
end