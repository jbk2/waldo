class Character < ApplicationRecord

  belongs_to :image

  validates :name, presence: true
  validates :start_x, presence: true
  validates :start_y, presence: true
  validates :end_x, presence: true
  validates :end_y, presence: true

  
end
