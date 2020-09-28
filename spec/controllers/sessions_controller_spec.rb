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
  end

  describe "Get#logged_in" do
    let!(:user1) {FactoryBot.create(:user)}
    before { allow_any_instance_of(ActionDispatch::Request).to receive(:session).and_return(user_id: user1.id) }
    context "when a request is made while logged in" do
      it "returns the user object" do
        get :logged_in
        returned_json = JSON.parse(response.body)      

        expect(response.content_type).to eq "application/json"
        expect(returned_json["logged_in"]).to eq(true)
        expect(returned_json["user"]["id"]).to eq(user1.id)
      end
    end
  end

  describe "Delete#logout" do
    let!(:user1) {FactoryBot.create(:user)}
    before { allow_any_instance_of(ActionDispatch::Request).to receive(:session).and_return(user_id: user1.id) }
    context "when a request is made while logged in" do
      it "returns the user object" do
        delete :logout
        returned_json = JSON.parse(response.body)      
         
         expect(response.content_type).to eq "application/json"
         expect(returned_json["logged_in"]).to eq(false) 
      end
    end
  end

  describe 'Post#Create' do
    let!(:user1) {FactoryBot.create(:user)}
    context "when a request is made while not logged in" do
      it "returns the logged_in status of false" do
        post :create, params: {"user"=>{"email"=>user1.email, "password"=>user1.password}}
        returned_json = JSON.parse(response.body)      
                
        expect(returned_json["logged_in"]).to eq(true)
        expect(returned_json["user"]["id"]).to eq(user1.id)

      end
    end
  end

end
