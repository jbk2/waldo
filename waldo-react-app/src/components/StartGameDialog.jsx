import { GameContext } from "../contexts/GameContext"
import { GamesContext } from "../contexts/GamesContext"
import { UIContext } from "../contexts/UIContext"
import { useContext, useRef } from "react"


export default function StartGameDialog() {
  const { prepareGame } = useContext(GameContext)
  const { imageIdsAndTitles } = useContext(GamesContext)
  const dialogRef = useRef()
  
  const handlePlayGameClick = (chosenGameTitle) => {
    prepareGame(chosenGameTitle);
    if(dialogRef.current) dialogRef.current.close();
  };

  return(
    <dialog
      ref={dialogRef} id="startGameDialog"
      open
      className="fixed top-2/5 left-1/2 -translate-x-1/2 w-90 h-fit justify-center items-center
        bg-white border-2 rounded-md opacity-95 pb-8">
      <div className="flex flex-col">
        <h1 className="w-full font-variation-settings-wght-700 m-10 mb-9">Which game would you like to play?</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {
            imageIdsAndTitles.map((image) => {
              return(
                <button
                  onClick={() => handlePlayGameClick(image.title)}
                  key={image.id}  
                  className="h-fit w-34 mx-2 p-3 px-4 rounded-lg hover:cursor-pointer
                    border-2 border-indigo-300 hover:border-indigo-400 bg-cyan-400 hover:bg-cyan-500
                    font-variation-settings-wght-600 font-raleway text-sm tracking-wide">
                  {image.title}
                </button>
              )
            })
          }
        </div>
      </div>
    </dialog>
  )
}