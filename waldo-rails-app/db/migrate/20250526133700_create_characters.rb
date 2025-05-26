class CreateCharacters < ActiveRecord::Migration[8.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.boolean :clicked
      t.decimal :startX
      t.decimal :endX
      t.decimal :startY
      t.decimal :endY

      t.timestamps
    end
  end
end
