class CreateScores < ActiveRecord::Migration[8.0]
  def change
    create_table :scores do |t|
      t.references :user, null: false, foreign_key: true
      t.references :image, null: false, foreign_key: true
      t.integer :game_time

      t.timestamps
    end
    add_index :scores, [:image_id, :game_time]
  end
end
