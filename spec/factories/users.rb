require "factory_bot"

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    username {"testuser"}
    password { 'password' }
    password_confirmation { 'password' }
    role {"admin"}
  end

end