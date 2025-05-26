class CharactersController < ApplicationController

  def show
    @character = Character.find(params[:id])
    render json: @character
  end

  def index
    @characters = Character.all
    render json: @characters
  end
  
end
