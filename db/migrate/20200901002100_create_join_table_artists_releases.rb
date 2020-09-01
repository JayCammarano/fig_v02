class CreateJoinTableArtistsReleases < ActiveRecord::Migration[5.2]
  def change
    create_join_table :artists, :releases do |t|
      # t.index [:artist_id, :release_id]
      # t.index [:release_id, :artist_id]
    end
  end
end
