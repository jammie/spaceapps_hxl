class AddProjectIdOnAssets < ActiveRecord::Migration
  def up
    add_column :assets, :project_id, :integer
  end

  def down
    remove_column :assets, :project_id
  end
end
