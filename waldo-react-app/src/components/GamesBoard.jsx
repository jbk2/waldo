// import { useContext } from "react";
import GameTable from "./GameTable";
import ImageAPI from "../utils/imageAPI";
import { GamesContext } from "../contexts/GamesContext";

export default function GamesBoard({pastGameTime}) {

  return(
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-xl font-variation-settings-wght-700 mb-2">Competition Board</h1>
      { pastGameTime && (
        <p className="text-md">You completed your last game in {(pastGameTime / 1000).toFixed(2)}</p>
      )}

      <div className="flex flex-col mt-4">
        { <GameTable /> }
      </div>
    </div>
  )
}