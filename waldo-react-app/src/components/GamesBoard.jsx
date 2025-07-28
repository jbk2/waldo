export default function GamesBoard({pastGameTime, games}) {

console.log('games from GamesBoard are', games);
  return(
    <>
      <h1>Games coun tis {games.length} </h1>
      <div>
        <h1>Competition Board</h1>
        <p>Your last game ranked: __past game time was
          { pastGameTime ? pastGameTime : ' no past game time found'}
        </p>
      </div>

      <div id="">
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