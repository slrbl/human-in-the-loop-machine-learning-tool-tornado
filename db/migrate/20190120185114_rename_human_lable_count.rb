class RenameHumanLableCount < ActiveRecord::Migration[5.1]
  def change
    rename_column :datasets, :human_lable_count, :human_labels_count
  end
end
