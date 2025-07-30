import GameTable from "./GameTable";
import ImageAPI from "../utils/imageAPI";
export default function GamesBoard({pastGameTime, games, imageTitles}) {

  const imageArray = games.reduce((acc, game) => {
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
    <div className="flex flex-col items-center mt-10">
      <h1>Competition Board</h1>
      { pastGameTime && (
        <p>Your last game ranked: __past game time was
          { pastGameTime ? pastGameTime : ' no past game time found'}
        </p>
      )}

      <div className="flex flex-col mt-4">
        {    
          <GameTable games={games} imageArray={imageArray} imageTitles={imageTitles} />
        }
      </div>
    </div>
  )
}