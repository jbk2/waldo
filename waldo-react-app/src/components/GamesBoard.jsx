import GameTable from "./GameTable";
export default function GamesBoard({pastGameTime, games}) {


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
  
  console.log('games from GamesBoard are', games);
  console.log('imageArray from GamesBoard are', imageArray);
  
  return(
    <div className="flex flex-col items-center mt-10">
        <h1>Competition Board</h1>
        <p>Your last game ranked: __past game time was
          { pastGameTime ? pastGameTime : ' no past game time found'}
        </p>

      <div className="flex flex-col gap-8">
          {    
            imageArray.map((img) => {
              return(<GameTable image={img} />)
            })
          }
      </div>
    </div>
  )
}