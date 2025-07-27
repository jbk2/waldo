export default function UserGamesBoard({usersGames}) {
  
  return(
    <div>
      <h1 className="text-xl font-variation-settings-wght-700">Games you've played:</h1>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Games Played</div>
          <div>{Object.keys(usersGames).length}</div>
        </div>
      </div>
      {Object.values(usersGames).map((image) => (
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