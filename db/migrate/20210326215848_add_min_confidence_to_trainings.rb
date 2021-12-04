class AddMinConfidenceToTrainings < ActiveRecord::Migration[5.1]
  def change
    add_column :trainings, :min_confidence, :float
  end
end
