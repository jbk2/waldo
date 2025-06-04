import Game from '../components/Game';
import SignIn from '../components/SignIn';
import { useOutletContext } from 'react-router-dom';

export default function HomePage() {

  const { setAlert, characters, setCharacters, loggedIn, setLoggedIn, handleSignIn } = useOutletContext();

  return(
    <>
      {loggedIn
        ? 
          <Game setAlert={setAlert} characters={characters} setCharacters={setCharacters}/>
        :
          <SignIn handleSignIn={handleSignIn} setAlert={setAlert}  />
      }
    </>
  )
}