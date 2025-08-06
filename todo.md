# Todo list


- abstract Competition Board, UserGamesBoard, GamesBoard, GameTable logic out to ResultsContext
- add link from bestrank in stats components to said game in the competition baord (abstract lastGameRow logic out to a 'focussed game row' or something, where last game sets it if user has a last game, or best rank link sets it if clicked)
- implement email conf for auth & password change
- potentially refactor the navigation state setting object to use useReducer
  (as state has a different shape depending where it came from)?
- intro functionality to stop games being able to be played twice?
- monotype digits check
- deal with the constant re-rendering, everywhere
- move AuthContext fetches out to authAPI.js util class
- create new images
  - build better way to create image characters from clicks?

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
