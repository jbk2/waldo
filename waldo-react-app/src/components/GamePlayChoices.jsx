import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";
import { GamesContext } from "../contexts/GamesContext";

export default function GamePlayChoices({dialogRef}) {
  const { prepareGame, resetGameState } = useContext(GameContext)
  const { imageIdsAndTitles } = useContext(GamesContext)
  const navigate = useNavigate();

  // const handlePlayGameClick = (chosenGameTitle) => {
  //   prepareGame(chosenGameTitle);
  //   if(dialogRef.current) dialogRef.current.close();
  // };


  function handlePlayGameClick(chosenGameTitle) {
    resetGameState();
    if(dialogRef.current) dialogRef.current.close();
    prepareGame(chosenGameTitle);
    navigate('/');
  };


  return(
    <div className="flex flex-wrap justify-center gap-4">
      {
        imageIdsAndTitles.map((image) => {
          return(
            <button
              onClick={() => handlePlayGameClick(image.title)}
              key={image.image_id}  
              className="h-fit w-34 p-3 px-4 rounded-lg hover:cursor-pointer
                border-2 border-indigo-300 hover:border-indigo-400 bg-cyan-400 hover:bg-cyan-500
                font-variation-settings-wght-600 font-raleway text-sm tracking-wide">
              {image.title}
            </button>
          )
        })
      }
    </div>
  );
};