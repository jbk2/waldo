export default function ScoreBoard({alert}) {

  return(
    <div data-testid='score-board' className="ml-4 relative">
      {alert}
      Time elapsed: 00:00
    </div>
  )

}