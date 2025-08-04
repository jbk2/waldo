import { GameContext } from '../contexts/GameContext';
import { TimerContext } from '../contexts/TimerContext';
import { useContext, useState, useRef, useEffect } from "react";

export default function GameTimer() {
  // console.log('GameTimer rendered now >>', Date.now());
  const { gameState, GAME_STATES } = useContext(GameContext);
  const { getStartTime } = useContext(TimerContext);
  const intervalRef = useRef(null);
  const [ elapsedTime, setElapsedTime ] = useState(0);
  const seconds = (elapsedTime / 1000).toFixed(2)


  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING) {
      setElapsedTime(0);

      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - getStartTime());
      }, 20);
      
      return () => {
        if(intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    } else if (gameState === GAME_STATES.IDLE || gameState === GAME_STATES.LOADING) {
      setElapsedTime(0);
    }
  }, [gameState, getStartTime, GAME_STATES.PLAYING, GAME_STATES.IDLE, GAME_STATES.LOADING]);

  return(
    <div  id="game-timer" className="text-sm w-40 flex items-baseline">
      Elapsed time:&nbsp;
      <div className='flex w-14 items-baseline justify-start'>
        <span className={`text-md font-mono font-medium
          ${ gameState === GAME_STATES.COMPLETED ? 'underline decoration-wavy decoration-1 \
          decoration-green-600 underline-offset-3' : ''}`}>{seconds}
        </span>
        <span className='text-xs font-variation-settings-wght-600 pl-[1px]'>s</span>
      </div>
    </div>
  )
}