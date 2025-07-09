import Game from '../components/Game';
import { useEffect } from 'react';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';

export default function HomePage() {
  const { loggedIn } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(!loggedIn) {
      navigate('/sign-in');
    }
  }, [loggedIn, navigate])

  if(!loggedIn) {
    return(
      <div>
        <img src="/assets/images/spinner" alt="Loading" />
      </div>
    );
  }
  
  return(
    <Game />
  );
}