import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";

export default function EndGameDialog() {
  const { gameCompletedLength, startGame, resetGame } = useContext(GameContext);
  const gameCompletedLengthSeconds = (gameCompletedLength / 1000).toFixed(2)
  const endGameDialogRef = useRef();
  const navigate = useNavigate();

  function handleSignIn() {
    resetGame();
    navigate('sign-in', { state:
      { pastGame: true,
        routeToCompetitionBoard: true,
        pastGameTime: gameCompletedLength
      }
    });
    console.log('from EndDialog, gameCompletedTime >>', gameCompletedLength);
  }

  function handleSignUp() {
    resetGame();
    navigate('sign-up', { state:
      { pastGame: true,
        routeToCompetitionBoard: true,
        pastGameTime: gameCompletedLength
      }
    });
    console.log('from EndDialog, gameCompletedTime >>', gameCompletedLength);
  }

  function handleStartGameClick() {
    navigate('/');
    startGame();
    if(endGameDialogRef.current) endGameDialogRef.current.close();
  };

  return(
    <dialog ref={endGameDialogRef} id="endGameDialog"
      open
      className="fixed top-2/5 left-1/2 -translate-x-1/2 w-90 h-64 opacity-95
        bg-white border-2 rounded-md justify-center items-center p-4">
      <p>
        Well done, you found all the characters 👏.<br/>
        And it took you
        <span>{gameCompletedLengthSeconds < 20 ? ' only - ' : ' - '}</span>
        <span className="text-md font-mono font-medium tabular-nums lining-nums underline
          decoration-wavy decoration-1 decoration-green-600 underline-offset-3 pr-[1px]">
          { gameCompletedLengthSeconds }
        </span>
        s.
      </p>
      <br></br>
        <span onClick={handleSignIn} className="link font-variation-settings-wght-600">Sign in </span>
        <span>or</span>
        <span onClick={handleSignUp} className="link font-variation-settings-wght-600"> sign up </span>
        <span>to rank your score and play other games</span>
      <button onClick={handleStartGameClick} className="block mx-auto mt-5 h-fit p-3 px-4
        rounded-lg hover:cursor-pointer border-2 border-indigo-300 hover:border-indigo-400
        bg-cyan-400 hover:bg-cyan-500 font-variation-settings-wght-600 font-raleway text-sm
        tracking-wide underline decoration-wavy decoration-2 decoration-blue-600 underline-offset-4">
        PLAY AGAIN
      </button>
    </dialog>
  );
}