class Artist < ApplicationRecord
  validates :name, presence: true
  has_and_belongs_to_many :releases 
  has_and_belongs_to_many :aliases
  has_many :labels, through: :releases
  has_many :tags, through: :releases

  def imageCaller
    if self.images.first
    image_url = self.images.first.attachment.url
    end
  end

  def releaseImageCaller
    releases = []
    self.releases.each do |release|
      if release.images.first
      releaseImage = release.images.first.attachment.url
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
    lastfmHash[:similar] = parsed[:artist][:similar]
    lastfmHash[:bio] = parsed[:artist][:bio][:content]
    return lastfmHash
  end

end
