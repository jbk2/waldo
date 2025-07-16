import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";

export default function EndGameDialog() {
  const { gameCompletedLength, startGame } = useContext(GameContext);
  const gameCompletedLengthSeconds = (gameCompletedLength / 1000).toFixed(2)
  const endGameDialogRef = useRef();
  const navigate = useNavigate();


  const handleStartGameClick = () => {
    navigate('/');
    startGame();
    // removeImgBlur();
    if(endGameDialogRef.current) endGameDialogRef.current.close();
  };

  return(
    <dialog ref={endGameDialogRef} id="endGameDialog"
      open
      className="fixed top-2/5 left-1/2 -translate-x-1/2 w-90 h-44 opacity-95
        bg-white border-2 rounded-md justify-center items-center p-4">
      <p>
        Well done, you found all the characters.<br/>
        It took you –&nbsp;
        <span className="text-md font-mono font-medium tabular-nums lining-nums underline
          decoration-wavy decoration-1 decoration-green-600 underline-offset-3 pr-[1px]">
          { gameCompletedLengthSeconds }
        </span>
        s.
      </p>
      <button onClick={handleStartGameClick} className="block mx-auto mt-5 h-fit p-3 px-4
        rounded-lg hover:cursor-pointer border-2 border-indigo-300 hover:border-indigo-400
        bg-cyan-400 hover:bg-cyan-500 font-variation-settings-wght-600 font-raleway text-sm
        tracking-wide underline decoration-wavy decoration-2 decoration-blue-600 underline-offset-4">
        PLAY AGAIN
      </button>
    </dialog>
  );
}