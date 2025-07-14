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
      className="border-2 rounded-md top-1/5 left-1/2 -translate-x-1/2 w-90 h-40
        bg-white justify-center items-center p-4">
      <p>
        Well done, you found all the characters, in a time of; { gameCompletedLengthSeconds }s
      </p>
      <button onClick={handleStartGameClick} className="font-variation-settings-wght-600 font-raleway
        tracking-wide underline decoration-wavy decoration-2 decoration-blue-600
        underline-offset-3">
        Play again
      </button>
    </dialog>
  );
}