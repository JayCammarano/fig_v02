class Api::V1::ArtistsController < ApplicationController
  require "discogs"
  include CurrentUserConcern


  def index    
    render json: Artist.all
  end

  def discogs
    wrapper = Discogs::Wrapper.new("Fig", user_token: ENV["DISCOGS_API_KEY"])
    credits = []
    search = wrapper.search(params["artists"][0], :per_page => 10, :type => :artist)
    if search.results[0] != nil      
      artistID = search.results[0]["id"]
      releases = wrapper.get_artist_releases(artistID)
      releases.releases.each do |release|
        if release.title.downcase.include?(release_params["title"].downcase)
          albumBlob = wrapper.get_master_release(release.id)
          titleBlob = {title: release.title}
          yearBlob = {year: release.year}
          credits << yearBlob
          credits << titleBlob
          albumBlob.tracklist.each do |track|
            track.extraartists.each do |artist|          
              if artist["role"] === "Featuring"
                if artist["anv"] != ""
                  artist_hash = {artist: artist["anv"]}
                else
                  artist_hash = {artist: artist["name"]}
                end
                credits << artist_hash 
              end
            end
          end
        end
        credits
      end
    render json: credits
    else
      error = {
        error: "Artist not found",
        status: 400
      }
      render :json => error, :status => :bad_request
    end
  end

  def show
    begin
      @artist = Artist.find(params[:id]) 
      render json: @artist, serializer: ArtistReleaseSerializer
     rescue ActiveRecord::RecordNotFound  
      error = {
        error: "Artist not found",
        status: 400
      }
      render :json => error, :status => :bad_request
      return
     end
  end

  def create    
    new_artist = Artist.new(artist_params)    
    image = Image.create(attachment: params[:image])    
    new_artist.images << image

    Artist.alt_name_creator(new_artist, params[:alt_name])
        
    if new_artist.save
      render json: new_artist
    else
      render json: {errors: new_artist.errors.full_messages}
    end
  end

  def destroy
    if @current_user.role === "admin"
      @artist = Artist.find(params[:id])
      if @artist.destroy
        flash[:success] = 'Artist was successfully deleted.'
        redirect_to artists_url
      else
        flash[:error] = 'Something went wrong'
        redirect_to artists_url
      end
    else      
      error = {
      error: "Insufficient privileges to complete the operation. User must be admin",
      status: 400
    }
    render :json => error, :status => :bad_request
    end
  end
  
  private
  def artist_params
    params.permit(:name, :description, :image, :altNames)
  end
  def release_params
    params.permit(:title, :description, :original_release_year, :release_type, :embed_url, :artists)
  end

end
