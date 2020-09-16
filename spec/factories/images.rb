require "factory_bot"
FactoryBot.define do
  factory :image do
    attachment { Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/images/testcover.jpg'), 'image/jpeg') }  
  end
end