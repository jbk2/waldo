import { useContext } from "react";
import { getOrdinalSuffix } from "../utils/stringUtils";
import { ResultsContext } from "../contexts/ResultsContext";

export default function UserGamesBoard({games, userGames}) {
  const { setActiveTabImageId } = useContext(ResultsContext);
  const gamesByImage = games.reduce((acc, game) => {
    if(!acc[game.image_id]) acc[game.image_id] = [];
    
    acc[game.image_id].push(game);
    acc[game.image_id].sort((a, b) => a.time - b.time);
    return acc
  }, {});
  
  const usersStatsByImage = userGames?.reduce((acc, game) => {
    const image_id = game.image.id
    const image_title = game.image.title

    if(!acc[image_id]) {
      acc[image_id] = {
        image_id,
        image_title,
        play_count: 0,
        best_game: null,
        rank: null
      }
    }

    acc[image_id].play_count += 1;
    if(!acc[image_id].best_game || game.time < acc[image_id].best_game.time) {
      acc[image_id].best_game = game;
    }

    return acc
  }, {});

  Object.values(usersStatsByImage).forEach((image) => {
    const allGamesForImage = gamesByImage[image.image_id] || [];
    const bestGameIndex = allGamesForImage.findIndex(game => game.id === image.best_game.id)
    image.rank = bestGameIndex >= 0 ? bestGameIndex + 1 : null;
  });

  const totalGamesCount = userGames.length;

  return(
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-lg font-variation-settings-wght-700 mb-2">Your games:</h1>
      <div className="flex">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Games Played</div>
            <div className="stat-value">{totalGamesCount}</div>
          </div>
        </div>
        {Object.values(usersStatsByImage).map((image) => (
          <div key={image.image_id} className="stats shadow hover:cursor-pointer" onClick={() => setActiveTabImageId(image.image_id)}>
            <div className="stat">
              <div className="stat-title">{image.image_title}</div>
              <div className="stat-value">{image.play_count}&nbsp;
                <span className="text-sm">games played</span>
              </div>
              <div className="stat-desc flex justify-end text-indigo-700">
                <p className="">Best rank:&nbsp;</p>
                <p className="ordinal">
                  {image.rank}
                  </p>
                <p className="ml-[1px] text-[0.5rem] align-super underline underline-offset-1 decoration-1">{getOrdinalSuffix(image.rank)}</p>
              </div>
            </div>
          </div>
        ))} 
      </div>
    </div>
  )
}