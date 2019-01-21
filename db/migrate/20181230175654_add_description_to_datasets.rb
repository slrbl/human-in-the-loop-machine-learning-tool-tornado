class AddDescriptionToDatasets < ActiveRecord::Migration[5.1]
  def change
    add_column :datasets, :description, :text
  end
end
