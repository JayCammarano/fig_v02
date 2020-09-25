class AddRolesToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :role, :string, null: false, :default => "user"
    add_column :users, :username, :string, null: false
  end
end
