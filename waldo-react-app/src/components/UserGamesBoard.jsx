import { getOrdinalSuffix } from "../utils/stringUtils";

export default function UserGamesBoard({games, userGames}) {
  
  const gamesByImage = games.reduce((acc, game) => {
    if(!acc[game.image_id]) acc[game.image_id] = [];
    
    acc[game.image_id].push(game);
    acc[game.image_id].sort((a, b) => a.time - b.time);
    return acc
  }, {});
  
  const usersGamesByImage = userGames ? (userGames.reduce((acc, game) => {
    const image_id = game.image.id
    const image_title = game.image.title

    if(!acc[image_id]) {
      acc[image_id] = {
        image_id,
        image_title,
        play_count: 0,
        games: []
      }
    }

    acc[image_id].play_count += 1;
    acc[image_id].games.push(game);
    acc[image_id].games.sort((a, b) => a.time - b.time );
    return acc
  }, {})) : ({});
  
  const usersBestGamesByImage = Object.entries(usersGamesByImage).reduce((acc, [key, value]) => {
    acc[key] = {
      game_id: value.games[0].id,
      game_time: value.games[0].time
    }
    return acc;
  }, {});
  
  const usersBestGamesWithRank = Object.entries(usersBestGamesByImage).reduce((acc, [imageId, bestGameData]) => {
    if(!acc[imageId]) acc[imageId] = {};
    
    const allImagesGames = gamesByImage[imageId] || [];
    const rank = allImagesGames.findIndex(game => game.id === bestGameData.game_id) + 1
    
    acc[imageId] = {
      game_id: bestGameData.game_id,
      game_time: bestGameData.game_time,
      rank: rank
    }
    
    return acc
  }, {});

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
        {Object.values(usersGamesByImage).map((image) => (
          <div key={image.image_id} className="stats shadow">
            <div className="stat">
              <div className="stat-title">{image.image_title}</div>
              <div className="stat-value">{image.play_count}&nbsp;
                <span className="text-sm">games played</span>
              </div>
              <div className="stat-desc flex justify-end text-indigo-700">
                <p className="">Best rank:&nbsp;</p>
                <p className="ordinal">
                  {usersBestGamesWithRank && usersBestGamesWithRank[image.image_id].rank}
                  </p>
                <p className="ml-[1px] text-[0.5rem] align-super underline underline-offset-1 decoration-1">{getOrdinalSuffix(usersBestGamesWithRank[image.image_id].rank)}</p>
              </div>
            </div>
          </div>
        ))} 
      </div>
    </div>
  )
}