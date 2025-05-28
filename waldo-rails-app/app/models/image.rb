class Image < ApplicationRecord
  has_many :characters, inverse_of: :image, dependent: :destroy
  accepts_nested_attributes_for :characters, allow_destroy: true

  validates :title, presence: true, length: { minimum: 3, maximum: 40 }
  validates :image, presence: true

  has_one_attached :image
end
