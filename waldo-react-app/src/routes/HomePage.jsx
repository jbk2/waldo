import { useState } from 'react';
import Navbar from '/src/components/Navbar';
import Game from '../components/Game';

export default function HomePage() {

  const [ alert, setAlert ] = useState(null)


  return(
    <>
      <Navbar alert={alert}/>
      <Game setAlert={setAlert} />
    </>
  )
}