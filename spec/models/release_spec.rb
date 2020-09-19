require 'rails_helper'

RSpec.describe Release, type: :model do
  describe "add_artist" do
  artist1 = Artist.new(name: "test")
  artist2 = Artist.new(name: "test2")
  
  let!(:release_with_artists){FactoryBot.create(:release, artists: [artist1, artist2])}
  let!(:release_without_multiple_artists){FactoryBot.create(:release)}

    context "when a release is created" do
      it "has the correct number of artists" do       
         
        expect(release_with_artists.artists.count).to eq(2)
        expect(release_without_multiple_artists.artists.count).to eq(1)
        expect(release_with_artists.artists.first.name).to eq(artist1.name)
        expect(release_with_artists.artists.first.name).to eq(artist1.name)
        expect(release_with_artists.artists.first.id).to eq(artist1.id)
        expect(release_with_artists.artists.last.name).to eq(artist2.name)
        expect(release_with_artists.artists.last.id).to eq(artist2.id)
      end
    end

    context "when an artist is in the artist array twice" do
      it "is not duplicated" do

      release_params = {title: "title", original_release_year: "2013", release_type: "Album"}
      artist_params = [artist1.name, artist1.name]
      release_add_artist = Release.add_artists(release_params, artist_params)

      expect(release_add_artist[:artists].count).to eq(1)
      end
    end
  end
end
