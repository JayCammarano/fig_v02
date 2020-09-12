class ReleaseArtistsSerializer < ActiveModel::Serializer
  attributes :id, :title, :release_type, :embed_url, :description, :original_release_year,:relatedArtists, :relatedLabels, :embed_url

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
