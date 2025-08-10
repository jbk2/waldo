require 'rails_helper'

RSpec.describe Game, type: :model do
  fixtures :all

  it "must have belong_to an image record" do
    game = Game.new(user: users(:one), image: images(:one), time: 100)
    expect(game).to be_valid
  end
  it "must belong_to a user record" do
    invalid_game = Game.new(image: images(:one), time: 100)
    expect(invalid_game).not_to be_valid
    valid_game = Game.new(user: users(:one), image: images(:one), time: 100)
    expect(valid_game).to be_valid
  end
  it "must have a time, that's greater than 0" do
    invalid_game = Game.new(user: users(:one), image: images(:one), time: 0)
    expect(invalid_game).not_to be_valid
    valid_game = Game.new(user: users(:one), image: images(:one), time: 1000)
    expect(valid_game).to be_valid
  end
end
