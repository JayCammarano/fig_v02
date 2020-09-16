require "factory_bot"
FactoryBot.define do
  factory :artist do
    name {'name'}
    description { 'description' }
    after(:create) do |artist|
      create_list :image, 1
    end
  end
end
