class CreateArtists < ActiveRecord::Migration[5.2]
  def change
    create_table :artists do |t|
      t.string :name, null: false
      t.text :description
      t.string :role
      t.timestamps
    end
  end
end
