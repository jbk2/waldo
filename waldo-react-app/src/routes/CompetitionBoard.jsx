import { useLocation } from "react-router-dom"

export default function CompetitionBoard() {
  const { state } = useLocation()
  const pastGameTime = state.pastGameTime;
  
  return(
    <div>
      <h1>Competition Board</h1>
      <p>past  game time was {pastGameTime} </p>
    </div>
  )
}