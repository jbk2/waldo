import { GameContext } from '../contexts/GameContext';
import { useContext } from "react";

export default function GameTimer() {
  const { gameElapsedTime, gameRunning, gamePlayed } = useContext(GameContext)
  const seconds = (gameElapsedTime / 1000).toFixed(2)

  return(
    <div  id="game-timer" className="text-sm w-40 flex items-baseline">
      Elapsed time:&nbsp;
      <div className='flex w-14 items-baseline justify-start'>
        <span className={`text-md font-mono font-medium
          ${ gamePlayed && !gameRunning ? 'underline decoration-wavy decoration-1 \
          decoration-green-600 underline-offset-3' : ''}`}>{seconds}
        </span>
        <span className='text-xs font-variation-settings-wght-600 pl-[1px]'>s</span>
      </div>
    </div>
  )

}