class Api::V1::ArtistsController < ApplicationController
  require "discogs"

  def index    
    render json: Artist.all
  end

  def discogs
    wrapper = Discogs::Wrapper.new("Fig", user_token: ENV["DISCOGS_API_KEY"])
    credits = []
    artistID = wrapper.search(params["artists"][0], :per_page => 10, :type => :artist).results[0]["id"]
    releases = wrapper.get_artist_releases(artistID)
    
 
    
    releases.releases.each do |title|
      if title.title.include?(release_params["title"])
        binding.pry
        albumBlob = wrapper.get_master_release(title.id)
        titleBlob = {title: title.title}
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
    end
    
    render json: credits

  end

  def show
    @artist = Artist.find(params[:id]) 
    render json: @artist, serializer: ArtistReleaseSerializer
  end

  def create
    new_artist = Artist.new(artist_params)
    Artist.alt_name_creator(new_artist, params[:altName])
        
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
  def release_params
    params.permit(:title, :description, :original_release_year, :release_type, :embed_url, :artists)
  end

end
