require "factory_bot"

FactoryBot.define do
  factory :artist do
    name {'Chance The Rapper'}
    description { 'Acid Rap' }
    after(:create) do |artist|
      create_list :image, 1
    end
  end
end
