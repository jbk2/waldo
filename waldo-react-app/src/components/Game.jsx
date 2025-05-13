import waldo1 from '../assets/images/waldo1.jpg';

export default function Game() {

  const wendaPosition = {
    name: 'wenda',
    startX: 0.495,
    endX: 0.511,
    startY: 0.876,
    endY: 0.918
  }

  const waldoPosition = {
    name: 'waldo',
    startX: 0.493,
    endX: 0.502,
    startY: 0.193,
    endY: 0.235
  }
  
  const odlawPosition = {
    name: 'odlaw',
    startX: 0.227,
    endX: 0.236,
    startY: 0.672,
    endY: 0.713
  }

  const characters = [ wendaPosition, waldoPosition, odlawPosition ];


  function hasClickedOnCharacter(clickX, clickY, character) {
    return(
      clickX >= character.startX && clickX <= character.endX &&
      clickY >= character.startY && clickY <= character.endY
    )
  }

  function handleImageClick(e) {
    const image = e.target;
    const rect = image.getBoundingClientRect();
    const clickX = Math.round(((e.clientX - rect.x) / rect.width) * 1000) / 1000;
    const clickY = Math.round(((e.clientY - rect.y) / rect.height) * 1000) / 1000;

    characters.map((character) => {
      if(hasClickedOnCharacter(clickX, clickY, character)) {
        console.log("YAAAY, YOU CLICKED ON >>", character.name)
      }
    })
  }; 
  
  return(
    <div data-testid="game-section">
      <img src={waldo1} onClick={handleImageClick}
        className='w-[80vw] max-w-[1400px] mx-auto border-4 rounded'
      ></img>
    </div>
  )
}