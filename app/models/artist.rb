class Artist < ApplicationRecord
  validates :name, presence: true
  has_and_belongs_to_many :releases 
  has_and_belongs_to_many :alt_names
  has_many :labels, through: :releases
  has_many :tags, through: :releases
  has_many :images, as: :imageable

  def imageCaller        
    if self.images.first
      image_url = self.images.first.attachment.url
    else
      return errors = {error: "No artist image"}    end
  end

  def self.alt_name_creator(artist_object, alt_name_array)
    if alt_name_array
      alt_name_array.each do |alt_name|
        name_hash = {name: alt_name}
        new_alt_name = AltName.new(name_hash)
        artist_object.alt_names << new_alt_name           
      end
    end
  end
  
  def releaseImageCaller
    releases = []
    self.releases.each do |release|     
      if release.images.first
      releaseImage = release.images.first
      else
        releaseImage = {error: "no release image"}
      end
      releases << {release_type: release.release_type, year: release.original_release_year, id: release.id, title: release.title, image: releaseImage}
    end
    releases
  end
  
  def lastfmCaller()
    name = self.name
    lastfmKey=ENV["LASTFM_API_KEY"]
    url= HTTParty.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=#{name}&api_key=#{lastfmKey}&format=json", format: :plain)
    parsed = JSON.parse url, symbolize_names: true
  
    lastfmHash= { }
    if !parsed[:error]
      lastfmHash[:similar] = parsed[:artist][:similar]
      lastfmHash[:bio] = ActionController::Base.helpers.strip_tags(parsed[:artist][:bio][:content])
    else
      return errors = {error: "Artist not found in last.fm DB"}

    end
    return lastfmHash
  end
end
