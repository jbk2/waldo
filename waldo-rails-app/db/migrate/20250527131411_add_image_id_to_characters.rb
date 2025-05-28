class AddImageIdToCharacters < ActiveRecord::Migration[8.0]
  def change
    add_reference :characters, :image, null: false, foreign_key: true
  end
end
