class ImagesController < ApplicationController
  
  def show
    @image = Image.find(params[:id])
    respond_to do |format|
      format.json { render json: @image }
      format.html { render :show }
    end
  end

  def new
    @image = Image.new
    @character = @image.characters.build
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      redirect_to @image
    else
      render :new
    end
  end

  private

  def image_params
    params.require(:image).permit(
      :image, :title,
      characters_attributes: [:id, :name, :start_x, :end_x, :start_y, :end_y]
      )
  end
end