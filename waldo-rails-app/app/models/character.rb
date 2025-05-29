class Character < ApplicationRecord
  belongs_to :image
  validates :name, :start_x, :end_x, :start_y, :end_y, presence: true
  validates :start_x, :end_x, :start_y, :end_y, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 1, message: "must be a decimal between 0 and 1" }
end
