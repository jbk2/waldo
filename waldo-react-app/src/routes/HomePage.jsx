import Game from '../components/Game';
import AuthForm from '../components/AuthForm';
import { useOutletContext, useSearchParams } from 'react-router-dom';

export default function HomePage() {
  const { showAlert, characters, setCharacters, loggedIn, handleSignIn } = useOutletContext();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return(
    <>
      {loggedIn
        ? 
          <Game showAlert={showAlert} characters={characters} setCharacters={setCharacters}/>
        :
          <AuthForm handleSignIn={handleSignIn} showAlert={showAlert} token={token} />
      }
    </>
  )
}