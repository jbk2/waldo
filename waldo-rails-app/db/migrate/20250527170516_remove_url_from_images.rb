class RemoveUrlFromImages < ActiveRecord::Migration[8.0]
  def change
    remove_column :images, :url, :string
  end
end
