class Api::ScoresController < ApplicationController
  # allow_unauthenticated_acces only: []

  def image_scores(img_id)
    image = Image.find(img_id)
    image_scores = image.scores

    render json: {
      image_id: img_id,
      scores: image_scores
    }
  end
end