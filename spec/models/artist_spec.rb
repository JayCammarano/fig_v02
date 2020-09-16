require 'rails_helper'

RSpec.describe Artist, type: :model do
  describe "releaseImageCaller" do
    let!(:image1){FactoryBot.create(:image)}
    let!(:artist1){FactoryBot.create(:artist)}
    let!(:release_with_image) {FactoryBot.create(:release, artists: [artist1], images: [image1])}
    let!(:release_without_image) {FactoryBot.create(:release, artists: [artist1], images: [])}

    context "when an artist has a release" do
      it "gets release's image and other info about the release" do
        artist = release_with_image.artists.first
        releases = artist.releaseImageCaller
        
        expect(releases[0][:image][:id]).to eq(artist.releases.first.images.first.id)
        expect(releases[0][:id]).to eq(artist.releases.first.id)
        expect(releases[0][:title]).to eq(artist.releases.first.title)
      end
    end

    context "when an artist has no release" do
      it "returns an error in images but still other release info" do
        artist = release_without_image.artists.first
        releases = artist.releaseImageCaller
        
        expect(releases[1][:image]).to eq({error: "no artist image"})
        expect(releases[1][:id]).to eq(artist.releases.last.id)
        expect(releases[1][:title]).to eq(artist.releases.last.title)
      end
    end
  end

  describe "lastfmCaller" do
    let!(:release1) {FactoryBot.create(:release)}
    context "when an artist is in last.fm's database" do
      it "gets information from last.fm" do
        artist1 = release1.artists.first
        lastFMInfo = artist1.lastfmCaller

        expect(lastFMInfo[:bio]).not_to be_empty
      end
    end

    context "when an artist isn't in last.fm's database" do
      it "returns an error" do
        artist1 = Artist.create(name: "asdghbjnkmiuyghbnmjku")
        lastFMInfo = artist1.lastfmCaller

        expect(lastFMInfo[:bio].nil?).to eq(true)
        expect(lastFMInfo).to eq({error: "Artist not found in last.fm DB"})
      end
    end
  end
  
  describe "imageCaller" do
    let!(:image1){FactoryBot.create(:image)}
    let!(:artist_with_image){FactoryBot.create(:artist, images: [image1])}
    let!(:artists_without_image){FactoryBot.create(:artist)}

    context "when an artist has an an image" do
      it "imageCaller returns the image" do
        imageCaller = artist_with_image.imageCaller

        expect(artist_with_image.images.first.attachment.nil?).to eq(false)
        expect(artist_with_image.imageCaller).to eq(artist_with_image.images.first.attachment.url)
      end
    end

    context "when an artist has no image" do
      it "imageCaller returns an error" do
        imageCaller = artists_without_image.imageCaller

        expect(artists_without_image.images.first.nil?).to eq(true)
        expect(artists_without_image.imageCaller).to eq({:error=>"No artist image"})
      end
    end
  end
  
  describe "alt_name_creator" do
    alt_name1 = AltName.new(name: "test")
    alt_name2 = AltName.new(name: "test2")
    let!(:artist_with_alt_name){FactoryBot.create(:artist, alt_names: [alt_name1, alt_name2])}
    let!(:artist_without_alt_name){FactoryBot.create(:artist)}

    context "when an artist has an alt name" do
      it "is created with the proper associations" do        
        expect(artist_with_alt_name.alt_names.first.name).to eq(alt_name1.name)
        expect(artist_with_alt_name.alt_names.first.id).to eq(alt_name1.id)
        expect(artist_with_alt_name.alt_names.last.name).to eq(alt_name2.name)
        expect(artist_with_alt_name.alt_names.last.id).to eq(alt_name2.id)
      end
    end

    context "when an artist has an no alt name" do
      it "is created without any alt_names" do        
        expect(artist_without_alt_name.alt_names.first.nil?).to eq(true)
      end
    end
  end
end
