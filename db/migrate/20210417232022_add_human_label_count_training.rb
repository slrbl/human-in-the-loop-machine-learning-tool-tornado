class AddHumanLabelCountTraining < ActiveRecord::Migration[5.1]
  def change
    add_column :trainings, :humna_label_count, :integer
  end
end
