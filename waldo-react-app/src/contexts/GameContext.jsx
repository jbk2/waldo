import { createContext, useEffect, useState, useRef } from "react";

const GameContext = createContext();

export default function GameProvider({children}) {
  const [ gameElapsedTime, setGameElapsedTime ] = useState(0);
  const [ gameRunning, setGameRunning ] = useState(false)
  const [ gamePlayed, setGamePlayed ] = useState(false)
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if(gameRunning) {
      const gameStartTime = Date.now();
      intervalRef.current = setInterval(() => {
        setGameElapsedTime(Date.now() - gameStartTime);
      }, 10)
    } else {
      if(intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [gameRunning])

  const startGame = () => {
    setGameElapsedTime(0);
    setGameRunning(true);
  }
  
  const stopGame = () => {
    setGameRunning(false);
    setGamePlayed(true);
    console.log('game stopped, it took:', gameElapsedTime, 'milliseconds')
  }

  const value = {
    gameElapsedTime,
    gameRunning,
    startGame,
    stopGame,
    gamePlayed
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContext };