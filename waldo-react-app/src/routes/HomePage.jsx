import Game from '../components/Game';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Welcome from '../components/Welcome';

export default function HomePage() {
  const [ viewedWelcome, setViewedWelcome ] = useState(false);
  
  return(
    <>
      {viewedWelcome ? (
        <Game />
      ) : (
        <Welcome setViewedWelcome={setViewedWelcome}/>
      )}
    </>
  )
}