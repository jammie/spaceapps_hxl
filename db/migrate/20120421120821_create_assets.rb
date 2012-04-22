class CreateAssets < ActiveRecord::Migration
  def change
    create_table :assets do |t|
      t.integer :user_id
      t.integer :organization_id
      t.string :data_file_name
      t.string :data_content_type
      t.integer :data_file_size

      t.timestamps
    end
  end
end
