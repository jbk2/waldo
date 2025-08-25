// import { useContext } from "react";
import GameTable from "./GameTable";
import ImageAPI from "../utils/imageAPI";
import { GamesContext } from "../contexts/GamesContext";
import { capitalize } from "../utils/stringUtils";

export default function GamesBoard({lastGameState}) {
  const { time } = lastGameState;
  const { imageTitle } = lastGameState;

  return(
    <div className="flex flex-col items-center mt-8 text-[var(--color-text-primary)]">
      <h1 className="text-xl font-variation-settings-wght-700 mb-2">Competition Board</h1>
      { time && imageTitle && (
        <p className="text-md">Your last game was
          <span className="">&nbsp;"{capitalize(imageTitle)}"</span>
          , completed in
          <span className="font-mono text-sm text-[var(--color-primary)] mx-1">{(time / 1000).toFixed(2)}</span>
          seconds.
        </p>
      )}
      <div className="flex flex-col mt-4">
        { <GameTable /> }
      </div>
    </div>
  )
}