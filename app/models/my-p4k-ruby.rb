require "nokogiri"
# require 'nokogiri-styles'
require "json"
require "httparty"
require "uri"
class P4kReview
  def initialize(blob)
    # def initialize(searched_artist, searched_album, matched_artist,
    #                matched_album, query, url, blob)
      # @searched_artist = searched_artist
      # @searched_album = searched_album
      # @matched_artist = matched_artist
      # @matched_album = matched_album
      # @query = query
      # @url = url
      @blob = blob
    end
  
  def search_for_review(artist, album)
    response = HTTParty.get("https://pitchfork.com/reviews/albums/18105-chance-the-rapper-acid-rap/")
    @parse_page = Nokogiri::HTML(response)
    puts @parse_page
    # review_digest = @parse_page.xpath(/html/body/div[4]/div/div/div[3]/div[1]/div/div[1]/div/article/div[2]/div[2]/div/div[1]/div)
    # puts review_digest
    # review-detail__abstract
  end
end