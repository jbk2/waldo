class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy

  normalizes :email_address, with: ->(e) { e.strip.downcase }
  validates :email_address, presence: true, uniqueness: true
  validates :password,
    presence: true,
    length: { minimum: 8 },
    format: { 
      with: /\A(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+\z/,
      message: "must have at least 8 characters, 1 capital letter, 1 digit, and 1 special character"
    }
end
