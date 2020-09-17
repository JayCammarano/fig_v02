require "factory_bot"

FactoryBot.define do
  factory :release do
    artists {[build(:artist)]} 
    title {'Acid Rap'}
    release_type {'Album'}
    embed_url {'www.soundcloud.com'}
    original_release_year { 2013 }
    description {'a description'}  
    after(:create) do |release|
      create_list :image, 1
    end
  end
  
end