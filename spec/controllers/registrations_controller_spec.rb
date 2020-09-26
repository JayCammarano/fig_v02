require 'rails_helper'

RSpec.describe RegistrationsController, type: :controller do
  describe 'POST#create' do
    context "when a post is made with correct params" do
      it "adds a new user to the database" do
        previous_count = User.count
        post :create, params: {"user"=>{"username"=> "test", "email"=>"test@gmail.com", "password"=>"testtest", "password_confirmation"=>"testtest"}}
        new_count = User.count

        expect(response.status).to eq 200
        expect(response.content_type).to eq "application/json"
        expect(new_count).to eq(previous_count + 1)
      end

      it "returns the user object" do
        post :create, params: {"user"=>{"username"=> "test","email"=>"test@gmail.com", "password"=>"testtest", "password_confirmation"=>"testtest"}}
        returned_json = JSON.parse(response.body)      

        expect(response.status).to eq 200
        expect(response.content_type).to eq "application/json"
        expect(returned_json["user"]["email"]).to eq("test@gmail.com")
      end
    end
    context "when a post is made with incorrect params" do
      it "returns an error" do
        previous_count = User.count
        post :create, params: {"user"=>{bad_user: "bad_user"}}
        new_count = User.count

        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 400
        expect(new_count).to eq(previous_count)
        expect(returned_json["error"]).to eq(["Password can't be blank", "Email can't be blank", "Username can't be blank"])
      end
    end
  end
end