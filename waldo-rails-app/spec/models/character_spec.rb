require 'rails_helper'

RSpec.describe Character, type: :model do
  describe 'required attributes' do
    let(:image) do
      image = Image.new(title: 'test image')

      image.image.attach(
        io: File.open(Rails.root.join("spec/fixtures/test_image1.webp")),
        filename: "test_image1.webp",
        content_type: "image/webp"
      )
      image.save
      image
    end

    let(:character) do
      image.characters.build(
        name: 'test character',
        start_x: '0.100',
        start_y: '0.200',
        end_x: '0.200',
        end_y: '0.300'
      )
    end

    context 'is valid with' do
      it 'name, start and end x and y coords' do
        expect(character).to be_valid
      end
    end

    context 'is invalid without' do
      it 'name' do
        character.name = ''
        expect(character).not_to be_valid
      end
      it 'start_x' do
        character.start_x = nil
        expect(character).not_to be_valid
      end
      it 'start_y' do
        character.start_y = nil
        expect(character).not_to be_valid
      end
      it 'end_x' do
        character.end_x = nil
        expect(character).not_to be_valid
      end
      it 'end_y' do
        character.end_y = nil
        expect(character).not_to be_valid
      end
    end

    context "coordinates must be correct range and format" do
      axis = %i[start_x end_x start_y end_y]
      axis.each do |axis_name|
        it "#{axis_name} must be a 3 place decimal below 1" do
          character.send("#{axis_name}=", 1.1234)
          expect(character).not_to be_valid
        end
      end

      axis.each do |axis_name|
        it "#{axis_name} must be a 3 place decimal above 0" do
          character.send("#{axis_name}=", -0.1234)
          expect(character).not_to be_valid
        end
      end

      axis.each do |axis_name|
        it "#{axis_name} must be a 3 place decimal" do
          character.send("#{axis_name}=", 0.1234)
          expect(character.send("#{axis_name}")).to eq(0.123)
        end
      end
    end
  end
end
