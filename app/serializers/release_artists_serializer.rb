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
    artist = URI.encode(object.artists.first.name)
    album = URI.encode(object.title)
    pitchfork_object = []
    search = "https://pitchfork.com/search/?query=#{artist}%20#{album}"
    response = HTTParty.get(search)
    response = Nokogiri::HTML.parse(response)    
    search_response = response.xpath('//*[@id="result-albumreviews"]/ul/li/div/a').map { |link| link['href'] }
    review_URL = "https://pitchfork.com#{search_response[0]}"
    review_response = HTTParty.get(review_URL)    
    parsed_review = Nokogiri::HTML.parse(review_response)    
    review_digest = parsed_review.xpath("//*[@id='review-article-5929e666eb335119a49ef35f']/div[2]/div[2]/div/div[1]/div/p")
    review_digest_parsed = ActionController::Base.helpers.strip_links(review_digest.to_s)
    full_review = parsed_review.xpath('//*[@id="review-article-5929e666eb335119a49ef35f"]/div[2]/div[2]/div/div[2]/div[1]/div[2]')
    full_review_parsed = ActionController::Base.helpers.strip_links(full_review.to_s)
    pitchfork_object << review_digest_parsed
    pitchfork_object << full_review_parsed
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
