class SetCharacterCoordinatePrecision < ActiveRecord::Migration[8.0]
    def change
      change_column :characters, :start_x, :decimal, precision: 4, scale: 3
      change_column :characters, :end_x,   :decimal, precision: 4, scale: 3
      change_column :characters, :start_y, :decimal, precision: 4, scale: 3
      change_column :characters, :end_y,   :decimal, precision: 4, scale: 3
    end
end
