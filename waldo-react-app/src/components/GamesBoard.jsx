import GameTable from "./GameTable";
import ImageAPI from "../utils/imageAPI";
export default function GamesBoard({pastGameTime, games, images}) {

  const imagesGames = games.reduce((acc, game) => {
    const imageId = game.image_id;
    const existingImageEl = acc.find(img => img.image_id === imageId);

    if(existingImageEl) {
      existingImageEl.games.push(game);
      existingImageEl.games.sort((a, b) => a.time - b.time);
    } else {
      acc.push({
        image_id: imageId,
        games: [game]
      });
    }
    return acc
  }, [])

  return(
    <div className="flex flex-col items-center mt-8">
      <h1 className="font-variation-settings-wght-500">Competition Board</h1>
      { pastGameTime && (
        <p className="text-md">You completed your last game in {(pastGameTime / 1000).toFixed(2)}</p>
      )}

      <div className="flex flex-col mt-4">
        { <GameTable games={games} imagesGames={imagesGames} images={images} /> }
      </div>
    </div>
  )
}