export default function ScoreBoard({alert}) {

  return(
    <div data-testid='score-board' className="ml-4">
      <div id="alert" className="relative w-60 h-12 -top-4">
        {alert ? alert : <div className="invisible">placeholder</div>}
      </div>
      <div id="scores">
        Time elapsed: 00:00
      </div>
    </div>
  )

}