import Game from '../components/Game';
import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function HomePage() {
  const { loggedIn } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(!loggedIn) {
      navigate('/sign-in');
    }
  }, [loggedIn, navigate])

  return(
    <Game />
  );
}