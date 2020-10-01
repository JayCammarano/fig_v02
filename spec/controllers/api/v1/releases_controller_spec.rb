require 'rails_helper'

RSpec.describe Api::V1::ReleasesController, type: :controller do
  let!(:release1) {FactoryBot.create(:release)}
  describe "GET#Show" do
    context "when an release is added to the database" do
      it "it can be viewed at /artists/artist_id/releases/id" do
        artist1 = release1.artists.first
        get :show, params: {artist_id: artist1.id, id: release1.id}
  
        expect(response.status).to eq 200
        expect(response.content_type).to eq "application/json"
      end

      it "returns the release information" do
        artist1 = release1.artists.first
        get :show, params: {artist_id: artist1.id, id: release1.id}
        returned_json = JSON.parse(response.body)

        expect(returned_json["id"]).to eq(release1.id)
        expect(returned_json["title"]).to eq(release1.title)
        expect(returned_json["description"]).to eq(release1.description)
        expect(returned_json["original_release_year"]).to eq(release1.original_release_year)
      end
    end

    context "when a release isn't in the database" do
      it "returns an error" do
        get :show, params: {artist_id: 86, id: 76}
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 400
        expect(response.content_type).to eq "application/json"
        expect(returned_json["error"]).to eq("Release not found")
        expect(returned_json["status"]).to eq(400)  
      end
    end
  end
  
  
  describe "POST#Create" do
    let!(:artist1) {FactoryBot.create(:artist)}\
  
    context "when a post is made with correct params" do
      it "adds a new Release to the database" do
        previous_count = Release.count
        post :create, params: {artist_id: artist1.id, title: "title", artists: [artist1.name], release_type: "Album", original_release_year: "2013"}
        new_count = Release.count

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(new_count).to eq(previous_count + 1)
      end

      it "returns the release information" do
        post :create, params: {artist_id: artist1.id, title: "title", artists: [artist1.name], release_type: "Album", original_release_year: "2013"}
        returned_json = JSON.parse(response.body)
        
        expect(returned_json["title"]).to eq("title")
        expect(returned_json["description"]).to eq(nil)
        expect(returned_json["original_release_year"]).to eq(2013)
      end
    end
    # context "when a post is made with an imageurl" do
    #   it "adds a new Release to the database with the imageurl as the image" do
    #     previous_count = Release.count
    #     post :create, params: {artist_id: artist1.id, title: "title", artists: [artist1.name], release_type: "Album", original_release_year: "2013", imageurl: "https://i.imgur.com/2RuHxLQ.jpg"}
    #     new_count = Release.count

    #     expect(response.status).to eq 200
    #     expect(response.content_type).to eq "application/json"
    #     expect(new_count).to eq(previous_count + 1)
    #   end

    #   it "returns the release information" do
    #     post :create, params: {artist_id: artist1.id, title: "title", artists: [artist1.name], release_type: "Album", original_release_year: "2013", imageurl: "https://i.imgur.com/2RuHxLQ.jpg"}
    #     returned_json = JSON.parse(response.body)
                
    #     expect(Release.last["title"]).to eq("title")
    #     expect(Release.last.images.first.attachment).to include("2RuHxLQ.jpg")
    #     expect(returned_json["original_release_year"]).to eq(2013)
        
    #   end
    # end

    context "when a post is made with invalid params" do
      it "doesnt add a new release to the database" do
        previous_count = Release.count
        post :create, params: {artist_id: artist1.id, bad_release: "bad_release"}
        new_count = Release.count
      
        expect(response.status).to eq 400
        expect(response.content_type).to eq "application/json"
        expect(new_count).to eq(previous_count)
      end

      it "returns an error" do
        post :create, params: {artist_id: artist1.id, bad_release: "bad_release"}
        returned_json = JSON.parse(response.body)
        
        expect(returned_json["errors"][0]).to eq("Title can't be blank")
        expect(returned_json["errors"][1]).to eq("Release type can't be blank")
        expect(returned_json["errors"][2]).to eq("Original release year can't be blank")
        expect(returned_json["errors"][3]).to eq("Artist You must add at least one artist")
      end
    end
  end
end
