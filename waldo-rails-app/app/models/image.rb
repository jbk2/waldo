class Image < ApplicationRecord
  enum :difficulty, easy: 0, medium: 1, difficult: 2, very_difficult: 3

  has_many :characters, inverse_of: :image, dependent: :destroy
  accepts_nested_attributes_for :characters, allow_destroy: true

  has_many :games, dependent: :destroy

  validates :title, presence: true, length: { minimum: 3, maximum: 40 }
  validates :image, presence: true

  has_one_attached :image
end
