require 'rails_helper'

RSpec.describe Api::V1::ArtistsController, type: :controller do
  describe "GET#Index" do
    let!(:image1) {FactoryBot.create(:image)}
    let!(:artist1) {FactoryBot.create(:artist, images: [image1])}
    let!(:artist2) {FactoryBot.create(:artist)}

    it "returns a status of 200" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns all the products in the database" do
      get :index
      returned_json = JSON.parse(response.body)
      
      expect(returned_json[0]["id"]).to eq(artist1.id)
      expect(returned_json[0]["name"]).to eq(artist1.name)
      expect(returned_json[0]["description"]).to eq(artist1.description)
      expect(returned_json[0]['imageCaller']).to eq(artist1.images.first.attachment.url)
     
      expect(returned_json[1]["id"]).to eq(artist2.id)
      expect(returned_json[1]["name"]).to eq(artist2.name)
      expect(returned_json[1]["description"]).to eq(artist2.description)
      expect(returned_json[1]['imageCaller']).to eq({"error" => "No artist image"})  
    end
  end

  describe "POST#Create" do
    let!(:artist1) {FactoryBot.create(:artist)}
    context "when a request with the correct params is made" do
      it "adds a new artist to the database" do
        previous_count = Artist.count
        post :create, :params =>  {:name => artist1.name }
        new_count = Artist.count
        
        expect(response.status).to eq 200
        expect(response.content_type).to eq "application/json"
        expect(new_count).to eq(previous_count + 1)
      end

      it "returns the newly added artist as a json object" do
        post :create, :params =>  {:name => artist1.name }
      end
    end

    context "when a request with the wrong params is made" do
      it "doesnt add a new artist to the database" do
        bad_artist = {bad_artist: "bad_artist"}
        previous_count = Artist.count      
        post :create, :params =>  {:bad_artist => bad_artist }
        new_count = Artist.count

        expect(response.status).to eq 200
        expect(response.content_type).to eq "application/json"
        expect(new_count).to eq(previous_count)
      end
    end
  end

  describe "GET#Show" do
    let(:release1) {FactoryBot.create(:release)}
    context "when a request with the correct params is made" do
      it "returns a status of 200" do
        get :show, params: { id: release1.artists.first.id }
            
        expect(response.status).to eq 200
        expect(response.content_type).to eq "application/json"
      end
    end

    it "returns all the releases from a particular artist" do
      artist1 = release1.artists.first
      get :show, params: { id: artist1.id }
      returned_json = JSON.parse(response.body)
     
      expect(returned_json["id"]).to eq(artist1.id)
      expect(returned_json["name"]).to eq(artist1.name)
      expect(returned_json["description"]).to eq(artist1.description)
    end

    context "when a request with the correct params is made" do
      it "returns a status of 400" do
        bad_artist = {bad_artist: bad_artist}
        get :show, params: { id: bad_artist }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 400
        expect(response.content_type).to eq "application/json"
        expect(returned_json["error"]).to eq("Artist not found")
        expect(returned_json["status"]).to eq(400)
      end
    end
  end

  describe "GET#discogs" do
    let!(:release1) {FactoryBot.create(:release)}
    context "when a request is made for a release in the discogs database" do
      it "returns a status of 200" do    
        artists = []    
        release1.artists.each do |artist|
          artists << artist.name
        end
        
        post :discogs, params: {title: release1.title, description: release1.description, artists: artists, "embed_url"=>release1.embed_url, controller: "api/v1/artists", action: "discogs", artist_id: release1.artists.first.id}
        returned_json = JSON.parse(response.body)
            
        expect(response.status).to eq 200
        expect(response.content_type).to eq "application/json"
      end

      it "returns the artists and original release year" do    
        artists = []    
        release1.artists.each do |artist|
          artists << artist.name
        end
        post :discogs, params: {title: release1.title, description: release1.description, artists: artists, "embed_url"=>release1.embed_url, controller: "api/v1/artists", action: "discogs", artist_id: release1.artists.first.id}
        returned_json = JSON.parse(response.body)            

        expect(response.status).to eq 200
        expect(response.content_type).to eq "application/json"
        expect(returned_json[0]).to eq({"year"=>2013})
        expect(returned_json[1]).to eq({"title"=>"Acid Rap"})
        expect(returned_json[2]).to eq({"artist"=>"BJ The Chicago Kid"})
      end
    end

    context "when a request is made for a release not the discogs database" do
      it "returns a status of 400 and an error" do    
        artists = ["asadasdasdasddascrw4trwdfs"]    
        post :discogs, params: {title: release1.title, description: release1.description, artists: artists, "embed_url"=>release1.embed_url, controller: "api/v1/artists", action: "discogs", artist_id: release1.artists.first.id}
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 400
        expect(response.content_type).to eq "application/json"
        expect(returned_json["error"]).to eq("Artist not found")
        expect(returned_json["status"]).to eq(400)
  
      end
    end
  end
  describe "POST#Destroy" do
    let!(:artist1) {FactoryBot.create(:artist)}
    let!(:user1) {FactoryBot.create(:user)}
    before { allow_any_instance_of(ActionDispatch::Request).to receive(:session).and_return(user_id: user1.id) }
    context "when a request as an admin is made" do
      it "deletes the artist" do
        previous_count = Artist.count
        post :destroy, :params =>  {:id => artist1.id}
        new_count = Artist.count
        
        expect(response.content_type).to eq "application/json"
        expect(new_count).to eq(previous_count - 1)
      end
    end
  end
  describe "POST#Destroy" do
    let!(:artist1) {FactoryBot.create(:artist)}
    let!(:user1) {FactoryBot.create(:user, role: "user")}
    before { allow_any_instance_of(ActionDispatch::Request).to receive(:session).and_return(user_id: user1.id) }
    context "when a request as a user is made" do
      it "returns an error" do
        previous_count = Artist.count
        post :destroy, :params =>  {:id => artist1.id}
        new_count = Artist.count
        returned_json = JSON.parse(response.body)
            
        expect(response.content_type).to eq "application/json"
        expect(returned_json["error"]).to eq("Insufficient privileges to complete the operation. User must be admin")
        expect(new_count).to eq(previous_count)
      end
    end
  end

end
