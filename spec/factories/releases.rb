require "factory_bot"
FactoryBot.define do

  factory :release do
    artists {[build(:artist)]} 
    title {'title'}
    release_type {'EP'}
    embed_url {'www.soundcloud.com'}
    original_release_year { 2020 }
    description {'a description'}  
    after(:create) do |release|
      create_list :image, 1
    end
  end
  
end