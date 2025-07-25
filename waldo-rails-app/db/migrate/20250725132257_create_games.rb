class CreateGames < ActiveRecord::Migration[8.0]

  def change
    create_table :games do |t|
      t.integer :time
      t.references :user, null: false, foreign_key: true
      t.references :image, null: false, foreign_key: true

      t.timestamps
    end

    add_index :games, [:image_id, :time]  # For ranking scores by image
    add_index :games, [:user_id, :image_id]  # For user's games on specific images
    add_index :games, :time  # For general score sorting
  end

end
