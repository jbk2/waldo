import { GameContext } from "../contexts/GameContext"
import { useContext, useRef } from "react"


export default function StartGameDialog() {
  const { startGame } = useContext(GameContext)
  const dialogRef = useRef()
  
  const handleBtnClick = () => {
    startGame();
    if(dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return(
    <dialog
      ref={dialogRef}
      open
      className="z-100 border-1 rounded bg-white w-40">
      <button onClick={handleBtnClick} className="text-3xl font-bold">
        StartGame?
      </button>
    </dialog>
  )
}