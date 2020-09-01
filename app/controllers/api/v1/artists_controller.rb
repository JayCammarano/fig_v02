class Api::V1::ArtistsController < ApplicationController
  def index    
    render json: Artist.all
  end

  def create
    new_artist = Artist.new(artist_params)
    Artist.alt_name_creator(new_artist, params[:alt_name])
    
    binding.pry
    
    if new_artist.save
      render json: new_artist
    else
      render json: {errors: new_artist.errors.full_messages}
    end
  end

  private
  def artist_params
    params.permit(:name, :description, :altName)
  end

end
