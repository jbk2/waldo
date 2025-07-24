class RemoceClickedFromCharacters < ActiveRecord::Migration[8.0]
  def change
    remove_column :characters, :clicked, :boolean
  end
end
