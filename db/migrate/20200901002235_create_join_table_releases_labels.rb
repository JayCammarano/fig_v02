class CreateJoinTableReleasesLabels < ActiveRecord::Migration[5.2]
  def change
    create_join_table :releases, :tags do |t|
      # t.index [:release_id, :tag_id]
      # t.index [:tag_id, :release_id]
    end
  end
end
