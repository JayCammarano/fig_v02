class ReleaseArtistsSerializer < ActiveModel::Serializer
  attributes :id, :title, :release_type, :embed_url, :description, :original_release_year,:relatedArtists, :relatedLabels, :embed_url,  :search_for_review
  require "my-p4k-ruby"
  require "nokogiri"
  # require 'nokogiri-styles'
  require "json"
  require "httparty"
  require "uri"
  
    require 'uri'

  def search_for_review
    response = HTTParty.get("https://pitchfork.com/reviews/albums/18105-chance-the-rapper-acid-rap/")
    response = Nokogiri::HTML.parse(response)    
    response_body = response.xpath("//*[@id='review-article-5929e666eb335119a49ef35f']/div[2]/div[2]/div/div[1]/div/p")
    response_parsed = response_body.to_s    
  end
  def relatedArtists
    object.artists.each do |artist|
        artist.name
    end
  end
  def relatedLabels
    object.labels.each do |label|
      label.name
    end
  end
end
