class Release < ApplicationRecord  
  validates :title, presence: true
  validates :release_type, presence: true
  validates :original_release_year, presence: true
  validate :artists_presence, on: :create
  has_many :images, as: :imageable
  
  def artists_presence
    errors.add(:artist, "You must add at least one artist") unless artists.present?
  end

  def self.add_artists(release_object, artists_array) 
    artists = []
    is_artist_valid = true
    if artists_array
      artists_array.each do |artist|        
        artists.each do |artist_object|     
          if artist_object.name === artist            
            is_artist_valid = false
          end
        end
        if artist === "" || is_artist_valid === false
        else          
          name_hash = {name: artist}
          new_artist = Artist.find_or_initialize_by(name_hash)
          artists << new_artist
        end
      end
    end
    release_object[:artists] = artists
    release_object
  end


  has_and_belongs_to_many :artists
  has_and_belongs_to_many :labels
  has_and_belongs_to_many :tags

end
