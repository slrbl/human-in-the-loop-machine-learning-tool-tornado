class AddSeedSizeToTrainings < ActiveRecord::Migration[5.1]
  def change
    add_column :trainings, :seed_size, :integer
  end
end
