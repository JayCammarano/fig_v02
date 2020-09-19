require 'factory_bot'

FactoryBot.define do
  RSpec.configure do |config|
    config.include FactoryBot::Syntax::Methods
  end
end
