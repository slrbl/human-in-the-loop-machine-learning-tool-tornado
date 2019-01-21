class AddInputsCountToDatasets < ActiveRecord::Migration[5.1]
  def change
    add_column :datasets, :inputs_count, :integer
  end
end
