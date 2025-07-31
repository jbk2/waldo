# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

def random_time_ms
  rand(20..400) * 1000
end

#  will not run unless there are 0 games
#  creates x10 games per image per user, therefore needs to be some users!
if Game.count == 0
  users = User.all
  images = Image.all

  users.each do |user| 
    images.each do |image|
      10.times do 
        user.games.create!(image_id: image.id, time: random_time_ms)
      end
    end
  end

  puts "Created #{Game.count} sample games"
else
  puts "Games already exist, skipping seed creation"
end
