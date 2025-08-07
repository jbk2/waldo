import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { GamesContext } from "../contexts/GamesContext";
import { AuthContext } from "../contexts/AuthContext";
import { UIContext } from "../contexts/UIContext";
import ResultsProvider from "../contexts/ResultsContext";
import UserGamesBoard from "../components/UserGamesBoard";
import GamesBoard from "../components/GamesBoard";


export default function CompetitionBoard() {
  const { state } = useLocation()
  const lastGameState = {
    time: state?.game.time,
    imageTitle: state?.game.imageTitle
  };
  const { userGames } = useContext(GamesContext);
  const { signedIn } = useContext(AuthContext);
  const { showAlert } = useContext(UIContext);
  const navigate = useNavigate();

  if(!signedIn) {
    showAlert('Sign in or sign up to view the competition board')
    navigate('/sign-in')
    return;
  }

  return(
    <ResultsProvider >
      {userGames ? (
        <UserGamesBoard />
      ) : (
          <h1>You haven't played any games yet - Link here to go play</h1>
      )}
      <GamesBoard lastGameState={lastGameState}/>
    </ResultsProvider>
  )
}