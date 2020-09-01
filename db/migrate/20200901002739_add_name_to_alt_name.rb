class AddNameToAltName < ActiveRecord::Migration[5.2]
  def change
    add_column :alt_names, :name, :string, null: false

  end
end
