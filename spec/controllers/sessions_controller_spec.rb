require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  let!(:user1) {FactoryBot.create(:user)}

  describe 'GET#logged_in' do
    context "when a request is made while not logged in" do
      it "returns the logged_in status of false" do
        get :logged_in
        returned_json = JSON.parse(response.body)      

        expect(returned_json["logged_in"]).to eq(false)
      end
    end

    context "when a request is made while logged in" do
      it "returns the logged_in status of true" do
      get :logged_in, params: {}, headers: {"user" => user1}

        returned_json = JSON.parse(response.body)      

        expect(returned_json["logged_in"]).to eq(true)
      end
    end
  end
end