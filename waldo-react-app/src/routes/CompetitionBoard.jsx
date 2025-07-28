import { useContext } from "react";
import { useLocation } from "react-router-dom"
import { GameContext } from "../contexts/GameContext";
import UserGamesBoard from "../components/UserGamesBoard";
import GamesBoard from "../components/GamesBoard";


export default function CompetitionBoard() {
  const { state } = useLocation()
  const pastGameTime = state?.pastGameTime;
  const { games, userGames } = useContext(GameContext);

  console.log('games is here', userGames)

  return(
    <>
      {userGames ? (
        <UserGamesBoard userGames={userGames} />
      ) : (
          <h1>You haven't played any games yet - Link here to go play</h1>
      )}
      <GamesBoard pastGameTime={pastGameTime} games={games} />
    </>
  )
}