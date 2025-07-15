import { GameContext } from "../contexts/GameContext"
import { useContext, useRef } from "react"


export default function StartGameDialog({removeImgBlur}) {
  const { startGame } = useContext(GameContext)
  const dialogRef = useRef()
  
  const handleStartGameClick = () => {
    startGame();
    removeImgBlur();
    if(dialogRef.current) dialogRef.current.close();
  };

  return(
    <dialog
      ref={dialogRef} id="startGameDialog"
      open
      className="fixed top-2/5 left-1/2 -translate-x-1/2 w-90 h-60 justify-center items-center
        bg-white border-2 rounded-md opacity-95">
      <button onClick={handleStartGameClick} className="h-fit p-3 px-4 rounded-lg hover:cursor-pointer
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        border-2 border-indigo-300 hover:border-indigo-400 bg-cyan-400 hover:bg-cyan-500
        font-variation-settings-wght-600 font-raleway text-sm tracking-wide underline decoration-wavy
        decoration-2 decoration-blue-600 underline-offset-3">
        PLAY A GAME ?
      </button>
    </dialog>
  )
}