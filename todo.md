# Todo list

## All
- Game play:
  - further review end of game logic to be clearer between GameContext#stopGame, Game#useEffect & #handleImgClick
- maybe create a UI functionality context?
- build out saving users's times, ranking users times
- build out competition board
- build out concept of playing different images, getting images from API
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