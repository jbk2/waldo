class Score < ApplicationRecord
  belongs_to :user
  belongs_to :image

  validates :game_time, presence: true, numericality: { greater_than: 0, only_integer: true }
end
