import { createContext, useState, useRef, useContext, useCallback, useEffect } from "react";
import { UIContext } from "./UIContext";
import { initialCharacters } from '../data/characters'
import { AuthContext } from "./AuthContext";
import { ScoresContext } from "./ScoresContext";
import { ImagesContext } from "./ImagesContext";
import placeholderImg from '../assets/images/waldo-scene1.jpg';
import ImageLoader from "../utils/imageLoader";

const GameContext = createContext();

export default function GameProvider({children}) {

  const [ gameTitle, setGameTitle] = useState('cake-factory')
  const [ gameImage, setGameImage] = useState(null)
  const [ imageLoading, setImageLoading] = useState(false)
  const [ imageLoaded, setImageLoaded] = useState(false)
  const [ characters, setCharacters ] = useState(null);
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
 
  useEffect(() => {
    console.log('chars and positions>>>', characters)
  }, [characters]) 

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
  
  async function prepareGame(chosenGameTitle) {
    console.log('startGame called'); 
    setImageLoading(true);
    setImageLoaded(false);

    try {  
      const newImage = await ImageLoader.getImageByTitle(chosenGameTitle)

      if (!newImage || !newImage.characters) {
        throw new Error('Invalid game image data - missing image and or characters');
      }

      setGameImage(newImage);
      
      const characterPositions = newImage.characters.map((char) => ({
          id: char.id,
          name: char.name,
          clicked: false,
          startX: char.start_x,
          endX: char.end_x,
          startY: char.start_y,
          endY: char.end_y,
      }))
      setCharacters(characterPositions);
      setClickCoords(null);

    } catch (error) {
      // Don't set gameImage to fallback - let the error be handled
      setImageLoading(false);
      console.error('Failed to start game:', error);
    }
  }
  
  function startGame() {
    setGameRunning(true);
    startGameTimer();
  }
  
  function resetGame() {
    setGameRunning(false);
    stopGameTimer();
    setGameElapsedTime(0);
    setClickCoords(null);
    setGamePlayed(false);
    // setCharacters(initialCharacters);
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
    prepareGame,
    startGame,
    resetGame,
    completeGame,
    gamePlayed,
    setGameTitle,
    imageLoading,
    imageLoaded,
    setImageLoading,
    setImageLoaded,
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContext };