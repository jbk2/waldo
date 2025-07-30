import { GameContext } from "../contexts/GameContext"
import { UIContext } from "../contexts/UIContext"
import { useContext, useRef } from "react"


export default function StartGameDialog() {
  const { prepareGame, setUserRequestedGame } = useContext(GameContext)
  const dialogRef = useRef()
  
  const handlePlayGameClick = (chosenGameTitle) => {
    setUserRequestedGame(chosenGameTitle)
    prepareGame(chosenGameTitle);
    if(dialogRef.current) dialogRef.current.close();
  };

  return(
    <dialog
      ref={dialogRef} id="startGameDialog"
      open
      className="fixed top-2/5 left-1/2 -translate-x-1/2 w-90 h-54 justify-center items-center
        bg-white border-2 rounded-md opacity-95">
      <div className="flex flex-col">
        <h1 className="w-full font-variation-settings-wght-700 m-10 mb-9">Which game would you like to play?</h1>
        <div className="flex justify-center">
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
        </div>
      </div>
    </dialog>
  )
}