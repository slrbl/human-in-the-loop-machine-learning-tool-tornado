class CreateMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :memberships do |t|
      t.integer :dataset_id
      t.integer :user_id

      t.timestamps
    end
  end
end
