import { createContext, useEffect, useState, useRef } from "react";

const GameContext = createContext();

export default function GameProvider({children}) {
  const [ gameTimer, setGameTimer ] = useState(0);
  const [ gameRunning, setGameRunning ] = useState(false)
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if(gameRunning) {
      intervalRef.current = setInterval(() => {
        setGameTimer((prev) => prev + 1);
      }, 1000)
    } else {
      if(intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [gameRunning])

  const startGame = () => {
    setGameTimer(0);
    setGameRunning(true);
  }
  
  const stopGame = () => {
    setGameRunning(false);
    console.log('game stopped, it took:', gameTimer, 'seconds')
  }

  const value = {
    gameTimer,
    startGame,
    stopGame
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContext };