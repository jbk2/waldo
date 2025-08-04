# Todo list

- look at memoisation of loadImages, && others, in GamesContext
- potentially refactor the navigation state setting object to use useReducer
  (as state has a different shape depending where it came from)?
- have startGame dialogue offer game options from all games data, not just hardcoded
- competition table:
  - add column sorting on BoardTables
- implement email conf for auth & password change
- monotype digits check
- deal with the constant re-rendering, everywhere
- move AuthContext fetches out to authAPI.js util class
- create new images
  - build better way to create image characters from clicks?
- extract game play option buttons out to separate component to be used in both dialogues

## All
- handle error for reset_password with invalid token
- responsive design for small screens

## Rails App
- tidy image creation view - perhaps

## React App
- write error route template


# Tests to write:
##React app
- competition board component
- save games, load games
- contexts; 

##Rails app
- test testLoadImages action 
