import Game from '../components/Game';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function HomePage() {
  return(
    <Game />
  );
}