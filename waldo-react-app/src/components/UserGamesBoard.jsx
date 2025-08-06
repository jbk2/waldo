import { useContext } from "react";
import { getOrdinalSuffix } from "../utils/stringUtils";
import { GamesContext } from "../contexts/GamesContext";
import { ResultsContext } from "../contexts/ResultsContext";

export default function UserGamesBoard() {
  const { games, userGames } = useContext(GamesContext);
  const { setActiveTabImageId, setFocussedGameId } = useContext(ResultsContext);
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
    image.best_rank = bestGameIndex >= 0 ? bestGameIndex + 1 : null;
  });

  function handleBestGameClick(gameId, imageId) {
    console.log('handlebestgame click gameID>>', gameId);
    setActiveTabImageId(imageId);
    setFocussedGameId(gameId);
  }

  console.log('userStatsBImage>>', usersStatsByImage);

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
          <div
            key={image.image_id}
            className="stats shadow hover:cursor-pointer"
            onClick={(e) => {
              console.log('🔥 Clicked element:', e.target);
              console.log('🔥 Has data-best-rank?', e.target.closest('[data-best-rank]'));
              if(!e.target.closest('[data-best-rank]')) {
                console.log('🔥 Parent clicked');
                setActiveTabImageId(image.image_id)
              } else {
                console.log('🔥 Best rank clicked - ignoring parent');
              }
            }}>
            <div className="stat">
              <div className="stat-title">{image.image_title}</div>
              <div className="stat-value">{image.play_count}&nbsp;
                <span className="text-sm">games played</span>
              </div>
              <div className="stat-desc flex justify-end text-indigo-700">
                <button
                  data-best-rank
                  className="ordinal hover:cursor-pointer bg-transparent border-none p-0 text-indigo-700 hover:underline flex items-center"
                  onClick={() => {
                    console.log('✅ Button clicked:', image.best_game.id, image.image_id);
                    handleBestGameClick(image.best_game.id, image.image_id)
                  }}
                >
                  <span>Best rank:&nbsp;</span>
                  <span className="ordinal">{image.best_rank}</span>
                  <span className="ml-[1px] text-[0.5rem] align-super underline underline-offset-1 decoration-1">
                    {getOrdinalSuffix(image.best_rank)}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))} 
      </div>
    </div>
  )
}