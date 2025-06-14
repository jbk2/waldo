import Game from '../components/Game';
import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function HomePage() {
  const { showAlert, characters, setCharacters, loggedIn } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(!loggedIn) {
      navigate('/sign-in');
    }
  }, [loggedIn, navigate])

  return(
    <Game showAlert={showAlert} characters={characters} setCharacters={setCharacters}/>
  );
}