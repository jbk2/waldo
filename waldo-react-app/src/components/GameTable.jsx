export default function GameTable({image}) {
  
  return(
    <div className="w-140 rounded-box border border-base-content/20 bg-base-100">
      <table key={image.image_id} className="table">
      {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Userame</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          { 
            image.games.map((game, i) => {
              return(
                <tr>
                  <th>{i+1}</th>
                  <td>{game.user_id}</td>
                  <td>{game.time}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </div>
  )
}