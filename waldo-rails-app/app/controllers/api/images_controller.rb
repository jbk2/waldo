class Api::ImagesController < ApplicationController
  allow_unauthenticated_access only: %i[ index by_title ]

  def index
    images = Image.all.includes(:characters)
    render json: {
      images: images,
      message: "successful return of all images with characters"
    }
  end

  def by_title
    image_title = params[:image_title]
    image = Image.includes(:characters).find_by(title: image_title)
    if image
      render json: {
        image: {
          id: image.id,
          title: image.title,
          url: image.image.url,
          characters: image.characters.as_json
        },
        message: "successful return of image by #{image_title}"
      }
    else
      render json: {
        message: "Image with title; #{image_title} not found"
      }, status: :not_found
    end
  end

end