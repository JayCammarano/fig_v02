require 'factory_bot'

FactoryBot.define do
  RSpec.configure do |config|
    config.include FactoryBot::Syntax::Methods
  end
  
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end

end
