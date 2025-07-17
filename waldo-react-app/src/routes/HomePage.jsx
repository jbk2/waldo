import Game from '../components/Game';
import { useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function HomePage() {
  const { signedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!signedIn) {
      navigate('/sign-in');
    }
  }, [signedIn, navigate])

  if(!signedIn) {
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