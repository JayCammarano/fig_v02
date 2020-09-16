require 'rails_helper'

RSpec.describe Api::V1::ReleasesController, type: :controller do
  let!(:release1) {FactoryBot.create(:release)}

  # describe "GET#Show" do
  #   context "when an release is added to the database" do
  #     it "it can be viewed at /artists/artist_id/releases/id" do
  #       artist1 = release1.artists.first
  #       get :show, params: {artist_id: artist1.id, id: release1.id}
  
  #       expect(response.status).to eq 200
  #       expect(response.content_type).to eq "application/json"
  #     end
  #     it "returns the release information" do
  #       artist1 = release1.artists.first
  #       get :show, params: {artist_id: artist1.id, id: release1.id}
        
  #       returned_json = JSON.parse(response.body)
        
  #       expect(returned_json["id"]).to eq(release1.id)
  #       expect(returned_json["title"]).to eq(release1.title)
  #       expect(returned_json["description"]).to eq(release1.description)
  #       expect(returned_json["original_release_year"]).to eq(release1.original_release_year)
  #       expect(returned_json["artistImageCaller"][0]["id"]).to eq(release1.artists.first.id)
  #     end
  
  #   end
  # end
  
  
  # describe "POST#Create" do
  #   let!(:artist1) {FactoryBot.create(:artist)}
  #   let!(:release1) {{title: "testtitle", artists: ([artist1])}}
    
  #   context "when a request with the correct params is made" do
  #     it "adds a new Release to the database" do
  #       previous_count = Release.count
  #       post :create, params: {artist_id: artist1.id, release1}
  #       new_count = Release.count

  #       expect(response.status).to eq 200
  #       expect(response.content_type).to eq "application/json"

  #       expect(new_count).to eq(previous_count + 1)
  #     end
  #   end
  # end
end
