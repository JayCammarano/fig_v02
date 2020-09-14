class CreateReleases < ActiveRecord::Migration[5.2]
  def change
    create_table :releases do |t|
      t.string :release_type, null: false
      t.string :embed_url
      t.text :title, null: false
      t.integer :original_release_year
      t.text :description
      t.timestamps
    end
  end
end
