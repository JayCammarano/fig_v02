class ArtistSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :imageCaller
end
