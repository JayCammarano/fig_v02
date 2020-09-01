class CreateJoinTableArtistAltName < ActiveRecord::Migration[5.2]
  def change
    create_join_table :artists, :alt_names do |t|
      # t.index [:artist_id, :alias_id]
      # t.index [:alias_id, :artist_id]
    end
  end
end
