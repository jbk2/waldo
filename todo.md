# Todo list

- build out scores context save game
  - Rails model for Game belongs_to User and Image
- deal with the constant re-render of navbar timer element every 10ms
- build out >x2 image choice
- create new images
  - build better way to create image characters from clicks?

## All
- Game play:
- build out saving users's times, ranking users times

- build out competition board
- build out concept of playing different images, getting images from API
  - GameContext.loadImage() in react app
  - Rails endpoint to provide image

- allow non auth'd users to play a game, only prompt sign in or
  account creatiion upon completion of first game.
- integrate calling react >> Rails API for the images
- integrate choosing from multiple game images
- need to refactor and DRY out all auth fetching, into external module
- write error route template
- handle error for reset_password with invalid token
- log out should clear characterStatus & erase game
- tests

## Rails App
- tidy image creation view - perhaps

## Tests to write:
- react app - competition board