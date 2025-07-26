import { useContext } from "react";
import { useLocation } from "react-router-dom"
import { GameContext } from "../contexts/GameContext";


export default function CompetitionBoard() {
  const { state } = useLocation()
  const pastGameTime = state?.pastGameTime;
  const { games } = useContext(GameContext);
  
  const gamesByImage = games ? games.reduce((acc, game) => {
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
  }, {}) : ({});


  console.log('games is here', games)
  console.log('gamesByImage:', gamesByImage)

  return(
    <>
      <div>
        <h1 className="text-xl font-variation-settings-wght-700">Games you've played:</h1>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Games Played</div>
            <div>{games?.length}</div>
          </div>
        </div>
        {Object.values(gamesByImage).map((image) => (
          <div key={image.imageID} className="stats shadow">
            <div className="stat">
              <div className="stat-title">{image.imageTitle}</div>
              <div>{image.playCount} games played</div>
            </div>
          </div>
        ))} 
      </div>

      <div>
        <h1>Competition Board</h1>
        <p>past  game time was {pastGameTime} </p>
      </div>
      <div id="users-scores">
        <table>
          <caption>Top scores - image #n</caption>
          <thead>
            <tr>
              <td>Rank</td>
              <td>Username</td>
              <td>Time</td>
            </tr>
          </thead>
          <tbody>
            {/* { for } */}
            <tr>
              <th></th>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        {/* per image */}
        {/* best 3 times x  */}
      </div>
      <div id="competition-scores">
        {/* top 15 scores */}
        {/* your position amongst them */}
      </div>
    </>
  )
}