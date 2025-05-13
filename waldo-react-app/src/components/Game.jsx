import waldo1 from '../assets/images/waldo1.jpg';

export default function Game() {
  
  return(
    <div data-testid="game-section">
      <img src={waldo1}></img>
      <button className='btn btn-primary'>Click me</button>
    </div>
  )
}