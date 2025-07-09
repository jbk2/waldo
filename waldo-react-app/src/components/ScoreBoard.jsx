import { GameContext } from '../contexts/GameContext';
import { useContext } from "react";

export default function ScoreBoard() {

  const { gameTimer } = useContext(GameContext)
  
  return(
    <div className="ml-4">
      
      <div id="scores">
        Elapsed time: {gameTimer}
      </div>
    </div>
  )

}