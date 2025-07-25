class Api::GamesController < ApplicationController
  # allow_unauthenticated_access only: []

  def image_scores(img_id)
    image = Image.find(img_id)
    image_scores = image.scores

    render json: {
      image_id: img_id,
      scores: image_scores
    }
  end

  def create()
    game = Game.new(game_params)
    game.user = Current.session.user
    if game.save
      render json: {
        message: "Game successfully saved",
        game: game
      }
    else
      render json: {
        message: @game.errors.full_messages.join(", ")
      }, status: :unprocessable_entity
    end
  end

  private
  def game_params
    params.require(:game).permit(:image_id, :time)
  end
end