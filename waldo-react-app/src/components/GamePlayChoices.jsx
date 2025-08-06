import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";
import { GamesContext } from "../contexts/GamesContext";
import { capitalize } from '../utils/stringUtils';
import DifficultyIllustration from "./DifficultyIllustration";

export default function GamePlayChoices({dialogRef}) {
  const { prepareGame, resetGameState } = useContext(GameContext)
  const { images, DIFFICULTY_PROPS } = useContext(GamesContext)
  const navigate = useNavigate();

  function handlePlayGameClick(chosenGameTitle) {
    resetGameState();
    if(dialogRef.current) dialogRef.current.close();
    prepareGame(chosenGameTitle);
    navigate('/');
  };

  return(
    <>
      <DifficultyIllustration diffProps={DIFFICULTY_PROPS}/> 
      <div className="flex flex-wrap justify-center gap-4">
        {
          images.map((image) => {
            const difficultyColor = DIFFICULTY_PROPS[image.difficulty].bg_color
            return(
              <div className="relative">
                <div className={`absolute -bottom-1 -right-1 rounded-xs h-2 w-3 ${difficultyColor}`}></div>
                <button
                  onClick={() => handlePlayGameClick(image.title)}
                  key={image.image_id}  
                  className="h-fit w-34 p-3 px-4 rounded-lg hover:cursor-pointer
                  border-2 border-indigo-300 hover:border-indigo-400 bg-cyan-400 hover:bg-cyan-500
                  font-variation-settings-wght-600 font-raleway text-sm tracking-wide">
                  {capitalize(image.title)}
                </button>
              </div>
            )
          })
        }
      </div>
    </>
  );
};