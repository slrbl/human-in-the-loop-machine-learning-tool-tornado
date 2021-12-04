class CreateTrainings < ActiveRecord::Migration[5.1]
  def change
    create_table :trainings do |t|
      t.float :acc
      t.float :val_acc
      t.integer :dataset_id
      t.string :es_id

      t.timestamps
    end
  end
end
