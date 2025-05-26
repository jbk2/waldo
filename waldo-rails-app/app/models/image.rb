class Image < ApplicationRecord
  has_many :characters

  validates :url, presence: true
  validates :name, presence: true
end
