# Todo list

- comp board game table
  - implement a scroll into vie wof users latest game, & refine it's animation
- have startGame dialogue offer game options frmo all games data, not just hardcoded
- put comp board navbar link there always, just show sign up message if not logged in
- if signedIn don't show singin/signup text in end game dialogue
- in comp board - animate last user game
- implement email conf for auth & password change
- comp board link in endGameDialog
- numeralise 
- add sorting on BoardTables
- deal with the constant re-render of navbar timer element every 10ms
- move AuthContext fetches out to authAPI.js util class
- build out >x2 image choice
- create new images
  - build better way to create image characters from clicks?
- Move all Games logic out of GameContext into GamesContext, keep state and logic pertaining to
  individual game being run in GameContext

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
React app
- competition board component
- save games, load games
- contexts; 

Rails app - test testLoadImages action 
