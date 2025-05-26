import Game from '../components/Game';
import { useOutletContext } from 'react-router-dom';

export default function HomePage() {

  const { setAlert, characters, setCharacters } = useOutletContext();

  return(
    <>
      <Game setAlert={setAlert} characters={characters} setCharacters={setCharacters}/>
    </>
  )
}