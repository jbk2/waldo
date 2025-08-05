class AddDifficultyToImage < ActiveRecord::Migration[8.0]
  def change
    add_column :images, :difficulty, :integer, null: false, default: 0
    add_index :images, :difficulty
  end
end
