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

  def create
    game = Game.new(game_params)
    game.user = Current.session.user
    if game.save
      render json: {
        message: "Game successfully saved",
        game: game
      }
    else
      render json: {
        message: game.errors.full_messages.join(", "),
        errors: game.errors
      }, status: :unprocessable_entity
    end
  end

  def index
    games = Game.all.includes(:image).order(created_at: :desc).limit(100)
    render json: {
      message: "Successfully returning all games",
      games: games
    }
  end

  def index_by_user
    api_user = User.find(params[:user_id])
    current_user = Current.session.user

    if api_user != current_user
      render json: {
        message: "front end user ID does not match session user ID"
      }, status: :unprocessable_entity
      return
    end

    users_games = Game.where(user_id: Current.session.user).includes(:image)

    if users_games.any?
      render json: {
        message: "Successfully found games",
        games: users_games.as_json(include: { image: { only: [ :id, :title ] } })
      }
    else
      render json: {
        message: "No games found"
      }, status: :unprocessable_entity
    end
  end


  private
  def game_params
    params.require(:game).permit(:image_id, :time)
  end
end