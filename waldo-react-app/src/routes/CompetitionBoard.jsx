import { useContext } from "react";
import { useLocation } from "react-router-dom"
import { ScoresContext } from '../contexts/ScoresContext'


export default function CompetitionBoard() {
  const { state } = useLocation()
  const pastGameTime = state?.pastGameTime;
  const { imageScores } = useContext(ScoresContext);

  return(
    <>
      <div>
        <h1>Competition Board</h1>
        <p>past  game time was {pastGameTime} </p>
      </div>
      <div id="users-scores">
        <table>
          <caption>Top scores - image #n</caption>
          <thead>
            <th>Rank</th>
            <th>Username</th>
            <th>Time</th>
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