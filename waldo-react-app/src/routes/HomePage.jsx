import { useState } from 'react';
import Navbar from '/src/components/Navbar';
import Game from '../components/Game';
import { initialCharacters } from '../data/characters'

export default function HomePage() {

  const [ alert, setAlert ] = useState(null)
  const [ characters, setCharacters ] = useState(initialCharacters);


  return(
    <>
      <Navbar alert={alert} characters={characters}/>
      <Game setAlert={setAlert} characters={characters} setCharacters={setCharacters}/>
    </>
  )
}