import { createContext, useState, useRef, useContext, useCallback } from "react";
import { UIContext } from "./UIContext";
import { AuthContext } from "./AuthContext";
import { ScoresContext } from "./ScoresContext";
import { GamesContext } from "./GamesContext";
import ImageAPI from "../utils/imageAPI";
import GameAPI from "../utils/gameAPI";

const GameContext = createContext();

export default function GameProvider({children}) {
  const [ userRequestedGame, setUserRequestedGame ] = useState(null)
  const [ imageLoading, setImageLoading] = useState(false)
  const [ imageLoaded, setImageLoaded] = useState(false)
  const [ gameImage, setGameImage] = useState(null)
  const [ characters, setCharacters ] = useState(null);
  const [ gameRunning, setGameRunning ] = useState(false)
  const [ gameElapsedTime, setGameElapsedTime ] = useState(0);
  const [ gamePlayed, setGamePlayed ] = useState(false)
  const [ gameCompletedLength, setGameCompletedLength] = useState(null) // for GameContext?
  const { setClickCoords } = useContext(UIContext);
  const { signedIn } = useContext(AuthContext);
  const { loadGames, loadUserGames } = useContext(GamesContext);
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
    let gameLength = null;

    if(intervalRef.current) {
      gameLength = Date.now() - gameStartTimeRef.current;
      setGameCompletedLength(gameLength);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return gameLength
  }

  async function prepareGame(chosenGameTitle) {
    if(imageLoaded && gameImage.title === chosenGameTitle) {
      startGame()
    } else {
      setImageLoading(true);
      setImageLoaded(false);
      
      try {  
        const newImageAndChars = await ImageAPI.getImageByTitle(chosenGameTitle)
        const { image: newImage, characters: newChars} = newImageAndChars;
        
        if (!newImage || !newChars) {
          throw new Error('Invalid game image data - missing image and or characters');
        }
        
        setGameImage(newImage);
        setCharacters(newChars.map(char => ({
          ...char,
          clicked: false
        })));
        
        setClickCoords(null);
      } catch (error) {
        setImageLoading(false);
        console.error('Failed to prepare game:', error);
      }
    }
  }
  
  function startGame() {
      setGameRunning(true);
      startGameTimer();
  }
  
  function resetCharacterClicks() {
    if (!characters) return null
    setCharacters(characters =>
      characters.map(char => ({
        ...char,
        clicked: false
      }))
    )
  }

  function resetGame() {
    setUserRequestedGame(null);
    resetGameState();
  }
  
  function resetGameState() {
    setGameRunning(false);
    stopGameTimer();
    setGameElapsedTime(0);
    setClickCoords(null);
    setGamePlayed(false);
    resetCharacterClicks();
  }
  
  const completeGame = useCallback(async () => {
    setUserRequestedGame(null)
    setGameRunning(false);
    const gameLength = stopGameTimer();
    setGamePlayed(true);
    if(signedIn) {
      const saveResponse = await GameAPI.saveGame(gameImage.id, gameLength);
      if (saveResponse.ok) {
        loadGames();
        loadUserGames();
      }
      return saveResponse

    } else {
      return { ok: true, data: { message: "user not logged in so not saved"} };
    }
  }, [signedIn, gameImage?.id, loadGames, loadUserGames]);


  const value = {
    gameImage,
    characters,
    setCharacters,
    gameElapsedTime,
    gameCompletedLength,
    gameRunning,
    userRequestedGame,
    setUserRequestedGame,
    prepareGame,
    startGame,
    resetGame,
    resetGameState,
    completeGame,
    setGameCompletedLength,
    gamePlayed,
    imageLoading,
    imageLoaded,
    setImageLoading,
    setImageLoaded
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContext };