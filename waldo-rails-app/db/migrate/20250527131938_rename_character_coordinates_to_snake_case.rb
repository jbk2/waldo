class RenameCharacterCoordinatesToSnakeCase < ActiveRecord::Migration[8.0]
  def change
    rename_column :characters, :startX, :start_x
    rename_column :characters, :endX, :end_x
    rename_column :characters, :startY, :start_y
    rename_column :characters, :endY, :end_y
  end
end