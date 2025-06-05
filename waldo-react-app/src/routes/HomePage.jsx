import Game from '../components/Game';
import AuthForm from '../components/AuthForm';
import { useOutletContext } from 'react-router-dom';

export default function HomePage() {

  const { showAlert, characters, setCharacters, loggedIn, handleSignIn } = useOutletContext();

  return(
    <>
      {loggedIn
        ? 
          <Game showAlert={showAlert} characters={characters} setCharacters={setCharacters}/>
        :
          <AuthForm handleSignIn={handleSignIn} showAlert={showAlert}  />
      }
    </>
  )
}