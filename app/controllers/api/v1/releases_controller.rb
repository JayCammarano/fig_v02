class Api::V1::ReleasesController < ApplicationController
  def create
    if params[:artists]
      params[:artists].each do |artist|
        if artist === ""
        else
          name_hash = {name: artist}
          new_artist = Artist.find_or_initialize_by(name_hash)
          @release.artists << new_artist
        end
      end
    end
    
    if @release.save      
      @release.artists.each do |artist|
        artist.save 
      end
      render json: @release 
    else
    render json: {errors: @release.errors.full_messages}
    end
end
  
  private

  def release_params
    params.permit(:title, :description, :original_release_year, :release_type, :embed_url, :artists)
  end

end
