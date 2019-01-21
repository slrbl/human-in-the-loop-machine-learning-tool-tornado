class AddEsIdToDatasets < ActiveRecord::Migration[5.1]
  def change
    add_column :datasets, :es_id, :string
  end
end
