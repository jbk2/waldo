import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";
import { AuthContext } from "../contexts/AuthContext";
import GamePlayChoices from "./GamePlayChoices";


export default function EndGameDialog() {
  const { gameCompletedLength, prepareGame, resetGame, resetGameState, gameImage } = useContext(GameContext);
  const { signedIn } = useContext(AuthContext);
  const gameCompletedLengthSeconds = (gameCompletedLength / 1000).toFixed(2)
  const dialogRef = useRef();
  const navigate = useNavigate();

  function handleSignIn() {
    resetGame();
    navigate('sign-in', { state:
      { nextRoute: '/competition-board',
        game: {
          time: gameCompletedLength,
          imageId: gameImage.id
        }
      }
    });
  }

  function handleSignUp() {
    resetGame();
    navigate('sign-up', { state:
      { nextRoute: '/competition-board',
        game: {
          time: gameCompletedLength,
          imageId: gameImage.id
        }
      }
    });
  }

 
  return(
    <dialog ref={dialogRef} id="endGameDialog"
      open
      className="fixed top-1/3 left-1/2 -translate-x-1/2 w-98 h-fit opacity-95
        bg-white border-2 rounded-md justify-center items-center p-9">
          {/* ixed top-2/5 left-1/2 -translate-x-1/2 w-90 h-fit justify-center items-center
          bg-white border-2 rounded-md opacity-95 pb-8 */}
      <p>
        Well done, you found all the characters 🎉.<br/>
        It took you
        <span>{gameCompletedLengthSeconds < 20 ? ' only - ' : ' - '}</span>
        <span className="text-md font-mono font-medium tabular-nums lining-nums underline
          decoration-wavy decoration-1 decoration-green-600 underline-offset-3 pr-[1px]">
          { gameCompletedLengthSeconds }
        </span>
        s.
        { signedIn && (
          <>
          &nbsp;See your score rank&nbsp;
          <Link
            to='/competition-board'
            state={{ game: { time: gameCompletedLength }}}
            className="hover:pointer-cursor link">here</Link>.
          </>
        )}
      </p>
      { !signedIn && (
        <>
          <br />
            <span onClick={handleSignIn} className="link font-variation-settings-wght-600">Sign in </span>
            <span>or</span>
            <span onClick={handleSignUp} className="link font-variation-settings-wght-600"> sign up </span>
            <span>to rank your score and play other games</span>
          <br />
        </>
      )}

      <p className="text-center font-variation-settings-wght-500 mt-5 mb-1">
        ⏬&nbsp;&nbsp;&nbsp;&nbsp;PLAY AGAIN&nbsp;&nbsp;&nbsp;&nbsp;⏬
      </p>
      <GamePlayChoices dialogRef={dialogRef} />
      {/* <div className="flex justify-center">
          <button onClick={() => handlePlayGameClick('cake-factory')} className="h-fit w-34 mx-2 p-3 px-4 rounded-lg hover:cursor-pointer
            border-2 border-indigo-300 hover:border-indigo-400 bg-cyan-400 hover:bg-cyan-500
            font-variation-settings-wght-600 font-raleway text-sm tracking-wide">
            Cake Factory
          </button>
          <button onClick={() => handlePlayGameClick('ali-baba')} className="h-fit w-34 mx-2 p-3 px-4 rounded-lg hover:cursor-pointer
            border-2 border-indigo-300 hover:border-indigo-400 bg-cyan-400 hover:bg-cyan-500
            font-variation-settings-wght-600 font-raleway text-sm tracking-wide">
            Ali-Baba
          </button>
        </div> */}
    </dialog>
  );
}