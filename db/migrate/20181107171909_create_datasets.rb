class CreateDatasets < ActiveRecord::Migration[5.1]
  def change
    create_table :datasets do |t|
      t.string :name
      t.string :path

      t.timestamps
    end
  end
end
