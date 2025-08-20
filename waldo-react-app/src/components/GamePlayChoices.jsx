import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";
import { GamesContext } from "../contexts/GamesContext";
import { capitalize } from '../utils/stringUtils';
// import DifficultyIllustration from "./DifficultyIllustration";

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
      {/* <DifficultyIllustration diffProps={DIFFICULTY_PROPS}/>  */}
      { images ? (
        <div className="flex flex-wrap justify-center gap-4 mt-3">
          {
            images.map((image) => {
              const difficultyColor = DIFFICULTY_PROPS[image.difficulty].bg_color
              const difficultyText = DIFFICULTY_PROPS[image.difficulty].text_abbreviation
              return(
                <div className="relative" key={image.image_id}>
                  <div className={`-top-0.5 -left-0.5 text-[0.6rem] absolute rounded-xs h-3 w-6 p-0 text-center leading-3 ${difficultyColor}`}>{difficultyText}</div>
                  <button
                    onClick={() => handlePlayGameClick(image.title)}
                      
                    className="h-fit w-34 p-3 px-4 rounded-lg hover:cursor-pointer border-2
                    bg-[var(--color-btn-secondary)] hover:bg-[hsl(from_var(--color-btn-secondary)_h_s_calc(l*0.90))]
                    border-[var(--color-border-secondary)] hover:border-[hsl(from_var(--color-border-secondary)_h_s_calc(l*0.90))]
                    font-variation-settings-wght-600 font-raleway text-sm tracking-wide">
                    {capitalize(image.title)}
                  </button>
                </div>
              )
            })
          }
        </div>
      ) : (
        <h1>No game images yet</h1>
      )
      }
    </>
  );
};