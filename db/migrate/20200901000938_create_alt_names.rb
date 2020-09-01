class CreateAltNames < ActiveRecord::Migration[5.2]
  def change
    create_table :alt_names do |t|

      t.timestamps
    end
  end
end
