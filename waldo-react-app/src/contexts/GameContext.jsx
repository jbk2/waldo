import { createContext, useState, useContext, useCallback, useMemo } from "react";
import { UIContext } from "./UIContext";
import { AuthContext } from "./AuthContext";
import { TimerContext } from "./TimerContext";
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
  const { setClickCoords } = useContext(UIContext);
  const { signedIn } = useContext(AuthContext);
  const { loadGames, loadUserGames } = useContext(GamesContext);
  const { startTimer, stopTimer } = useContext(TimerContext);
  const [ gameState, setGameState ] = useState(GAME_STATES.IDLE);
  const [ gameImage, setGameImage] = useState(null)
  const [ characters, setCharacters ] = useState(null);
  const [ gamePlayed, setGamePlayed ] = useState(false)
  const [ gameCompletedLength, setGameCompletedLength] = useState(null)
  
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
    startTimer();
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
    resetGameState();
  }
  
  function resetGameState() {
    stopTimer();
    setClickCoords(null);
    setGamePlayed(false);
    resetCharacterClicks();
  }
  
  const completeGame = useCallback(async () => {
    const gameLength = stopTimer();
    setGameState(GAME_STATES.COMPLETED);
    setGameCompletedLength(gameLength);
    setGamePlayed(true);
    
    if(signedIn) {
      console.log('=== COMPLETEGAME CALLED ===');
      const saveResponse = await GameAPI.saveGame(gameImage.id, gameLength);
      if (saveResponse.ok) {
        await loadGames();
        await loadUserGames();
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
    gameCompletedLength,
    prepareGame,
    startGame,
    resetGame,
    resetGameState,
    completeGame,
    setGameCompletedLength,
    gamePlayed,
    GAME_STATES,
    startTimer,
    stopTimer
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContext };