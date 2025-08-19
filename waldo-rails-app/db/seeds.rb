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

def check_image_file_exists(filename)
  image_path = Rails.root.join('waldo-game-imgs', filename)
  unless File.exist?(image_path)
    raise "Image file not found: #{filename} at path: #{image_path}"
  end
  image_path
end

# Create users if none exist
if User.count == 0
  5.times do |n|
    n += 1
    random_email = "#{n}@test.com"
    username = "test-user-#{n}"
    password = "Password12!"
    User.create!(email_address: random_email, username: username, password: password)
    puts "created user no #{n}"
  end
end

# Create images and characters if none exist
IMAGE_DATA = [
  {
    filename: 'cake-factory.jpg',
    title: 'cake factory',
    difficulty: 'easy',
    content_type: 'image/jpeg',
    characters: [
      { name: 'waldo', start_x: 0.487, end_x: 0.508, start_y: 0.183, end_y: 0.239 },
      { name: 'wenda', start_x: 0.493, end_x: 0.516, start_y: 0.868, end_y: 0.927 },
      { name: 'odlaw', start_x: 0.22, end_x: 0.242, start_y: 0.665, end_y: 0.72 }
    ]
  },
  {
    filename: 'ali-baba.png',
    title: 'ali baba',
    difficulty: 'medium',
    content_type: 'image/png',
    characters: [
      { name: 'waldo', start_x: 0.582, end_x: 0.605, start_y: 0.678, end_y: 0.732 },
      { name: 'wenda', start_x: 0.831, end_x: 0.857, start_y: 0.02, end_y: 0.065 },
      { name: 'odlaw', start_x: 0.943, end_x: 0.97, start_y: 0.58, end_y: 0.64 }
    ]
  },
  {
    filename: 'musketeers.jpg',
    title: 'musketeers',
    difficulty: 'difficult',
    content_type: 'image/jpeg',
    characters: [
      { name: 'waldo', start_x: 0.587, end_x: 0.598, start_y: 0.787, end_y: 0.813 },
      { name: 'wenda', start_x: 0.482, end_x: 0.498, start_y: 0.547, end_y: 0.574 },
      { name: 'odlaw', start_x: 0.162, end_x: 0.177, start_y: 0.348, end_y: 0.378 }
    ]
  },
  {
    filename: 'troy.jpg',
    title: 'troy',
    difficulty: 'very_difficult',
    content_type: 'image/jpeg',
    characters: [
      { name: 'waldo', start_x: 0.161, end_x: 0.173, start_y: 0.812, end_y: 0.838 },
      { name: 'wenda', start_x: 0.842, end_x: 0.855, start_y: 0.717, end_y: 0.745 },
      { name: 'odlaw', start_x: 0.97, end_x: 0.983, start_y: 0.782, end_y: 0.807 }
    ]
  }
]

if Image.count == 0
  begin
    IMAGE_DATA.each do |image_data|
      puts "Creating #{image_data[:title]} image..."

      # Create the image record
      image = Image.new(
        title: image_data[:title],
        difficulty: image_data[:difficulty]
      )

      # Attach the actual image file
      image_path = check_image_file_exists(image_data[:filename])
      image.image.attach(
        io: File.open(image_path),
        filename: image_data[:filename],
        content_type: image_data[:content_type]
      )
      image.save!

      # Create characters for this image
      image_data[:characters].each do |char_data|
        Character.create!(
          name: char_data[:name],
          start_x: char_data[:start_x],
          end_x: char_data[:end_x],
          start_y: char_data[:start_y],
          end_y: char_data[:end_y],
          image: image
        )
      end

      puts "Created #{image_data[:title]} image with #{image_data[:characters].length} characters"
    end

    puts "Created #{Image.count} images with #{Character.count} characters total"

  rescue => e
    puts "Error creating images: #{e.message}"
    puts "Make sure the image files exist in the waldo-game-imgs directory:"
    IMAGE_DATA.each { |img| puts "  - #{img[:filename]}" }
    raise e
  end
else
  puts "Images already exist, skipping image creation"
end

# Create sample games if none exist
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
