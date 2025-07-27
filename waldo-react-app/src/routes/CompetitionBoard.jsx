import { useContext } from "react";
import { useLocation } from "react-router-dom"
import { GameContext } from "../contexts/GameContext";
import UserGamesBoard from "../components/UserGamesBoard";
import GamesBoard from "../components/GamesBoard";


export default function CompetitionBoard() {
  const { state } = useLocation()
  const pastGameTime = state?.pastGameTime;
  const { userGames } = useContext(GameContext);
  
  const usersGamesByImage = userGames ? (userGames.reduce((acc, game) => {
    const imageID = game.image.id
    const imageTitle = game.image.title

    if(!acc[imageID]) {
      acc[imageID] = {
        imageID,
        imageTitle,
        playCount: 0
      }
    }

    acc[imageID].playCount += 1;
    return acc
  }, {})) : ({});


  console.log('games is here', userGames)
  console.log('gamesByImage:', usersGamesByImage)

  return(
    <>
      {userGames ? (
        <UserGamesBoard usersGames={usersGamesByImage}/ >
      ) : (
          <h1>You haven't played any games yet - Link here to go play</h1>
      )}
      <GamesBoard userGames={userGames} pastGameTime={pastGameTime} />
    </>
  )
}