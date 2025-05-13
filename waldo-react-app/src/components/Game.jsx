import waldo1 from '../assets/images/waldo1.jpg';

export default function Game() {
  
  return(
    <div data-testid="game-section">
      <img src={waldo1} className='w-[80vw] max-w-[1400px] mx-auto border-4 rounded'></img>
    </div>
  )
}