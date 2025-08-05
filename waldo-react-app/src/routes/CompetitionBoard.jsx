import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { GamesContext } from "../contexts/GamesContext";
import { AuthContext } from "../contexts/AuthContext";
import { UIContext } from "../contexts/UIContext";
import UserGamesBoard from "../components/UserGamesBoard";
import GamesBoard from "../components/GamesBoard";


export default function CompetitionBoard() {
  const { state } = useLocation()
  const pastGameTime = state?.game.time;
  const { games, userGames, images } = useContext(GamesContext);
  const { signedIn } = useContext(AuthContext);
  const { showAlert } = useContext(UIContext);
  const navigate = useNavigate();

  if(!signedIn) {
    showAlert('Sign in or sign up to view the competition board')
    navigate('/sign-in')
    return;
  }

  return(
    <>
      {userGames ? (
        <UserGamesBoard games={games} userGames={userGames} />
      ) : (
          <h1>You haven't played any games yet - Link here to go play</h1>
      )}
      <GamesBoard pastGameTime={pastGameTime} games={games} images={images} />
    </>
  )
}