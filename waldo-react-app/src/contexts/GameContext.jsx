import { createContext, useState, useRef, useContext, useCallback } from "react";
import { UIContext } from "./UIContext";
import { AuthContext } from "./AuthContext";
import { ScoresContext } from "./ScoresContext";
import { GamesContext } from "./GamesContext";
import ImageAPI from "../utils/imageAPI";
import GameAPI from "../utils/gameAPI";

const GameContext = createContext();

export default function GameProvider({children}) {
  const GAME_STATES = {
    IDLE:       'idle',
    LOADING:    'loading',
    PLAYING:    'playing',
    COMPLETED:  'completed'
  };
  const [ gameState, setGameState ] = useState(GAME_STATES.IDLE);
  const [ gameImage, setGameImage] = useState(null)
  const [ characters, setCharacters ] = useState(null);
  const [ gameElapsedTime, setGameElapsedTime ] = useState(0);
  const [ gamePlayed, setGamePlayed ] = useState(false)
  const [ gameCompletedLength, setGameCompletedLength] = useState(null) // for GamesContext?
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
    setGameState(GAME_STATES.LOADING);

    if(gameImage && gameImage.title === chosenGameTitle) {
      startGame()
    } else {
      
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
        setGameState(GAME_STATES.IDLE);
        console.error('Failed to prepare game:', error);
      }
    }
  }
  
  function startGame() {
    setGameState(GAME_STATES.PLAYING);
    // setGameRunning(true);
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
    setGameState(GAME_STATES.IDLE);
    // setUserRequestedGame(null);
    resetGameState();
  }
  
  function resetGameState() {
    // setGameRunning(false);
    stopGameTimer();
    setGameElapsedTime(0);
    setClickCoords(null);
    setGamePlayed(false);
    resetCharacterClicks();
  }
  
  const completeGame = useCallback(async () => {
    setGameState(GAME_STATES.COMPLETED);
    // setUserRequestedGame(null)
    // setGameRunning(false);
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
    gameState,
    setGameState,
    gameImage,
    characters,
    setCharacters,
    gameElapsedTime,
    gameCompletedLength,
    prepareGame,
    startGame,
    resetGame,
    resetGameState,
    completeGame,
    setGameCompletedLength,
    gamePlayed,
    GAME_STATES
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContext };