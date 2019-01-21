class AddUserIdToDatasets < ActiveRecord::Migration[5.1]
  def change
    add_column :datasets, :user_id, :integer
  end
end
