import Game from '../components/Game';
import { useEffect } from 'react';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';

export default function HomePage() {
  const { showAlert, characters, setCharacters, loggedIn } = useOutletContext();
  // const [searchParams] = useSearchParams();
  // const token = searchParams.get('token');
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