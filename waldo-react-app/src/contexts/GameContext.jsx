import { createContext, useState, useRef, useContext, useCallback } from "react";
import { UIContext } from "./UIContext";
import { initialCharacters } from '../data/characters'
import { AuthContext } from "./AuthContext";
import { ScoresContext } from "./ScoresContext";
import { ImagesContext } from "./ImagesContext";
import waldoScene1 from '../assets/images/waldo-scene1.jpg';
import ImageLoader from "../utils/imageLoader";

const GameContext = createContext();

export default function GameProvider({children}) {

  const [ gameTitle, setGameTitle] = useState('cake-factory')
  const [ gameImage, setGameImage] = useState({ url: waldoScene1 })
  const [ imageLoading, setImageLoading] = useState(false)
  const [ imageLoaded, setImageLoaded] = useState(false)
  const [ characters, setCharacters ] = useState(initialCharacters);
  const [ charactersAndPositions, setCharactersAndPositions ] = useState(null);
  const [ gameElapsedTime, setGameElapsedTime ] = useState(0);
  const [ gameRunning, setGameRunning ] = useState(false)
  const [ gamePlayed, setGamePlayed ] = useState(false)
  const [ gameCompletedLength, setGameCompletedLength] = useState(null)
  const { setClickCoords } = useContext(UIContext);
  const { signedIn, user } = useContext(AuthContext);
  const { saveGame } = useContext(ScoresContext);
  // const { images } = useContext(ImagesContext)
  const intervalRef = useRef(null);
  const gameStartTimeRef = useRef(0);
 

  function startGameTimer() {
    console.log('startGameTimer called');
  
    // Clear any existing interval first
    if(intervalRef.current) {
      console.log('Clearing existing interval');
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  
    setGameElapsedTime(0);
    gameStartTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setGameElapsedTime(Date.now() - gameStartTimeRef.current);
    }, 10);  
  }
  
  function stopGameTimer() {
    console.log('stopGameTimer called .....')
    if(intervalRef.current) {
      const gameLength = Date.now() - gameStartTimeRef.current;
      setGameCompletedLength(gameLength);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }
  

  async function startGame(chosenGameTitle) {
    console.log('startGame called'); 
    setImageLoading(true);
    setImageLoaded(false);

    try {  
      const gameImage = await ImageLoader.getImageByTitle(chosenGameTitle)
      console.log('from start game, game image is>>', gameImage);

      setGameImage(gameImage);
      const charPosns = gameImage.characters.map((char) => ({
          characterId: char.id,
          characterName: char.name,
          startX: char.start_x,
          endX: char.end_x,
          startY: char.start_y,
          endY: char.end_y,
      }))
      setCharactersAndPositions(charPosns);
      setClickCoords(null);

      setGameRunning(true);
      startGameTimer();
    } catch (error) {
      setImageLoading(false);
      console.error('Failed to start game:', error);
      // Handle error (show alert, etc.)
    }
  }
  
  function resetGame() {
    setGameRunning(false);
    stopGameTimer();
    setGameElapsedTime(0);
    setClickCoords(null);
    setGamePlayed(false);
    setCharacters(initialCharacters);
    console.log('game reset, gameElapsedTime >>', gameElapsedTime, 'milliseconds');
    console.log('game reset, gameCompletedTime >>', gameCompletedLength, 'milliseconds');
  }
  
  const completeGame = useCallback(() => {
    setGameRunning(false);
    stopGameTimer();
    setGamePlayed(true);
    if(signedIn) {
      saveGame(image_id, user, gameCompletedLength)
    }
  }, [saveGame, signedIn, user, gameCompletedLength]);

  const value = {
    gameImage,
    characters,
    setCharacters,
    gameElapsedTime,
    gameCompletedLength,
    gameRunning,
    startGame,
    resetGame,
    completeGame,
    gamePlayed,
    setGameTitle,
    imageLoading,
    imageLoaded
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContext };