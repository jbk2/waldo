import Game from '../components/Game';
import AuthForm from '../components/AuthForm';
import { useOutletContext } from 'react-router-dom';

export default function HomePage() {

  const { setAlert, characters, setCharacters, loggedIn, setLoggedIn, handleSignIn } = useOutletContext();

  return(
    <>
      {loggedIn
        ? 
          <Game setAlert={setAlert} characters={characters} setCharacters={setCharacters}/>
        :
          <AuthForm handleSignIn={handleSignIn} setAlert={setAlert}  />
      }
    </>
  )
}