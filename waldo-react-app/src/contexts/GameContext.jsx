import { createContext, useState, useRef, useContext } from "react";
import { UIContext } from "./UIContext";
import { initialCharacters } from '../data/characters'

const GameContext = createContext();

export default function GameProvider({children}) {
  const [ characters, setCharacters ] = useState(initialCharacters);
  const [ gameElapsedTime, setGameElapsedTime ] = useState(0);
  const [ gameRunning, setGameRunning ] = useState(false)
  const [ gamePlayed, setGamePlayed ] = useState(false)
  const [ gameCompletedLength, setGameCompletedLength] = useState(null)
  const { setClickCoords } = useContext(UIContext);
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
  
  function startGame() {
    setCharacters(initialCharacters);
    setClickCoords(null);
    setGameRunning(true);
    startGameTimer();
  }
  
  function resetGame() {
    setGameRunning(false);
    stopGameTimer();
    setGameElapsedTime(0);
    setClickCoords(null);
    setGamePlayed(false);
    console.log('game reset, gameElapsedTime >>', gameElapsedTime, 'milliseconds');
    console.log('game reset, gameCompletedTime >>', gameCompletedLength, 'milliseconds');
  }
  
  function completeGame() {
    setGameRunning(false);
    stopGameTimer();
    setGamePlayed(true);
  }

  const value = {
    characters,
    setCharacters,
    gameElapsedTime,
    gameCompletedLength,
    gameRunning,
    startGame,
    resetGame,
    completeGame,
    gamePlayed
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContext };