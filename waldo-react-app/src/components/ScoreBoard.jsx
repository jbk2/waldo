import { GameContext } from '../contexts/GameContext';
import { useContext } from "react";

export default function ScoreBoard() {
  const { gameElapsedTime } = useContext(GameContext)
  const seconds = (gameElapsedTime / 1000).toFixed(2)

  return(
    <div className="ml-4">
      
      <div id="scores">
        Elapsed time: {seconds}
      </div>
    </div>
  )

}