class AddUsernameToUsers < ActiveRecord::Migration[8.0]
  def up
    add_column :users, :username, :text, null: true

    User.find_each do |user|
      base_username = user.email_address.split('@').first
      username = base_username
      counter = 1

      while User.where(username: username).exists?
        username = "#{base_username}#{counter}"
        counter += 1
      end

      # Bypass validations since we're only updating username
      user.update_column(:username, username)
    end

    change_column_null :users, :username, false
    add_index :users, :username, unique: true
  end

  def down
    remove_index :users, :username
    remove_column :users, :username
  end
end
