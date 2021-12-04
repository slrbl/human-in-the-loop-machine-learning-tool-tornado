class AddMaxConfidenceToTrainings < ActiveRecord::Migration[5.1]
  def change
    add_column :trainings, :max_confidence, :float
  end
end
