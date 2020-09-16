require 'rails_helper'

RSpec.describe Api::V1::ArtistsController, type: :controller do
  describe "GET#Index" do
    let!(:artist1) {FactoryBot.create(:artist)}
    let!(:artist2) {FactoryBot.create(:artist)}

    it "returns a status of 200" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns all the artists in the database" do
      get :index

      returned_json = JSON.parse(response.body)
        
      expect(returned_json[0]["id"]).to eq(artist1.id)
      expect(returned_json[0]["name"]).to eq(artist1.name)
      expect(returned_json[0]["description"]).to eq(artist1.description)
    end
  end

end
