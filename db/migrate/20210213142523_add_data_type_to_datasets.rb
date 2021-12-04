class AddDataTypeToDatasets < ActiveRecord::Migration[5.1]
  def change
    add_column :datasets, :data_type, :string
  end
end
