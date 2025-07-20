import Game from '../components/Game';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function HomePage() {
  const { signedIn } = useContext(AuthContext);

  if(signedIn) {
    return(
      <Game />
    );
  } else {
    return(
      <Navigate to='/sign-in' replace />
    )
  }
}