class AddStatusToDatasets < ActiveRecord::Migration[5.1]
  def change
    add_column :datasets, :status, :string
  end
end
