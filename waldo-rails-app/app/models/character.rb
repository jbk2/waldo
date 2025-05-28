class Character < ApplicationRecord
  belongs_to :image

  validates :name, :start_x, :end_x, :start_y, :end_y, presence: true

end
