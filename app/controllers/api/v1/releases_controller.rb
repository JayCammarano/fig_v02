class Api::V1::ReleasesController < ApplicationController
  wrap_parameters false

  def show
    begin
      @artist = Artist.find(params[:artist_id]) 
      @release = @artist.releases.find(params[:id])
      render json: @release, serializer: ReleaseArtistsSerializer
       rescue ActiveRecord::RecordNotFound  
      error = {
        error: "Release not found",
        status: 400
      }
      render :json => error, :status => :bad_request
      return
     end

  end

  def create
    sanitized_params = Release.add_artists(release_params, params[:artists])
    
    if params[:image]
      image = Image.create(attachment: params[:image])
    elsif params[:imageurl]
      image = Image.create()
      image.remote_attachment_url = params[:imageurl]
    end
    @release = Release.new(sanitized_params)
    @release.images << image
    if @release.save      
      @release.artists.each do |artist|
        artist.save
      end
      render json: @release 
    else
      error = {errors: @release.errors.full_messages}    
      render :json => error, :status => :bad_request
    end
end
  
  private

  def release_params
    params.permit(:title, :description, :original_release_year, :release_type, :embed_url, :artists)
  end

end
