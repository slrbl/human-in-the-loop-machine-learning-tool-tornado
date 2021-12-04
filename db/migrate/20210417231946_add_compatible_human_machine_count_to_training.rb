class AddCompatibleHumanMachineCountToTraining < ActiveRecord::Migration[5.1]
  def change
    add_column :trainings, :compatible_human_machine_count, :integer
  end
end
