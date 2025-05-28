require 'rails_helper'

RSpec.describe Image, type: :model do

  describe 'required attributes' do
    it 'is invalid without a title' do
      image = Image.new()
      image.image.attach(
        io: File.open(Rails.root.join("spec/fixtures/test_image1.webp")),
        filename: "test_image1.webp",
        content_type: "image/webp"
      )
      expect(image).not_to be_valid
    end
    
    it 'is invalid without an image' do
      image = Image.new(title: 'test image' )
      expect(image).not_to be_valid
    end
    
    it 'is valid with a title and an image' do
      image = Image.new(title: 'Test Image')
      image.image.attach(
        io: File.open(Rails.root.join("spec/fixtures/test_image1.webp")),
        filename: "test_image1.webp",
        content_type: "image/webp"
      )
      expect(image).to be_valid
    end
  end
  
end
