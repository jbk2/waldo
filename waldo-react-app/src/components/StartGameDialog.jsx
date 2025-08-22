
import { useRef } from "react";
import GamePlayChoices from "./GamePlayChoices";


export default function StartGameDialog() {
  const dialogRef = useRef()
  
  return(
    <dialog
      ref={dialogRef}
      id="startGameDialog"
      data-testid="startGameDialog"
      open
      className="fixed top-1/3 left-1/2 -translate-x-1/2 w-90 h-fit justify-center items-center
        bg-[var(--color-bg-primary)] border-1 rounded-md opacity-95 pb-8">
      <div className="flex flex-col">
        <h1 className="w-full font-variation-settings-wght-700 m-10 mb-4">Which game would you like to play?</h1>
        <GamePlayChoices dialogRef={dialogRef} />
      </div>
    </dialog>
  )
}