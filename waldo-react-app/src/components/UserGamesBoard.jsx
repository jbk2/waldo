export default function UserGamesBoard({userGames}) {
  console.log('from UsersGames usersGame are>>', userGames)
  
  const usersGamesByImage = userGames ? (userGames.reduce((acc, game) => {
    const imageID = game.image.id
    const imageTitle = game.image.title

    if(!acc[imageID]) {
      acc[imageID] = {
        imageID,
        imageTitle,
        playCount: 0
      }
    }

    acc[imageID].playCount += 1;
    return acc
  }, {})) : ({});

  const totalGamesCount = userGames.length;

  return(
    <div>
      <h1 className="text-xl font-variation-settings-wght-700">Games you've played:</h1>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Games Played</div>
          <div>{totalGamesCount}</div>
        </div>
      </div>
      {Object.values(usersGamesByImage).map((image) => (
        <div key={image.imageID} className="stats shadow">
          <div className="stat">
            <div className="stat-title">{image.imageTitle}</div>
            <div>{image.playCount} games played</div>
          </div>
        </div>
      ))} 
    </div>
  )
}