import { createContext, useState, useRef, useContext, useCallback, useEffect } from "react";
import { UIContext } from "./UIContext";
import { AuthContext } from "./AuthContext";
import { ScoresContext } from "./ScoresContext";
import ImageAPI from "../utils/imageAPI";
import GameAPI from "../utils/gameAPI";

const GameContext = createContext();

export default function GameProvider({children}) {
  const [ gameImage, setGameImage] = useState(null)
  const [ imageLoading, setImageLoading] = useState(false)
  const [ imageLoaded, setImageLoaded] = useState(false)
  const [ characters, setCharacters ] = useState(null);
  const [ gameElapsedTime, setGameElapsedTime ] = useState(0);
  const [ gameRunning, setGameRunning ] = useState(false)
  const [ gamePlayed, setGamePlayed ] = useState(false)
  const [ userGames, setUserGames ] = useState(null)
  const [ gameCompletedLength, setGameCompletedLength] = useState(null)
  const { setClickCoords } = useContext(UIContext);
  const { signedIn, user } = useContext(AuthContext);
  const intervalRef = useRef(null);
  const gameStartTimeRef = useRef(0);
 
  useEffect(() => {
    console.log('chars and positions>>>', characters)
  }, [characters]);

  useEffect(() => {
    async function loadUserGames(userId) {
      if(signedIn && user) {
        const response = await GameAPI.getUserGames(userId);
        if(response.ok) {
          setUserGames(response.data.games);
        } else {
          console.error(response.data.message)
        }
      }
    }
    
    if (signedIn && user) {
      loadUserGames(user.id)
    }
  }, [signedIn, user])

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
        console.error('Failed to start game:', error);
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
    setGameRunning(false);
    stopGameTimer();
    setGameElapsedTime(0);
    setClickCoords(null);
    setGamePlayed(false);
    resetCharacterClicks();
  }
  
  const completeGame = useCallback(async () => {
    setGameRunning(false);
    stopGameTimer();
    setGamePlayed(true);
    if(signedIn) {
      const saveResponse = await GameAPI.saveGame(gameImage.id, gameCompletedLength);
      if (saveResponse.ok) {
        const loadGamesResponse = await GameAPI.getCurrentUsersGames();
        if(loadGamesResponse.ok) {
          setUserGames(loadGamesResponse.data.games);
        } else {
          console.error(loadGamesResponse.data.message)
        }
      }
      return saveResponse

    } else {
      return { ok: true, data: { message: "user not logged in so not saved"} };
    }
  }, [signedIn, gameImage?.id, gameCompletedLength]);


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
    setGameCompletedLength,
    gamePlayed,
    imageLoading,
    imageLoaded,
    setImageLoading,
    setImageLoaded,
    userGames
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContext };