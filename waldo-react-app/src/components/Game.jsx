import { capitalize } from '../utils/stringUtils';
import waldoScene1 from '../assets/images/waldo-scene1.jpg';
import { useState, useRef, useEffect } from 'react';


export default function Game({ showAlert, characters, setCharacters }) {
  const imageRef = useRef();
  const [ clickMarker, setClickMarker ] = useState(null);
  const [ clickedCharacter, setClickedCharacter ] = useState(null);
  const [ fadeOut, setFadeOut ] = useState(false);
  
  // __________________________________

  function hasClickedOnCharacter(clickX, clickY, character) {
    return(
      clickX >= character.startX && clickX <= character.endX &&
      clickY >= character.startY && clickY <= character.endY
    )
  }

  function handleImageClick(e) {
    const rect = imageRef.current.getBoundingClientRect();
    const clickX = Math.round(((e.clientX - rect.x) / rect.width) * 1000) / 1000;
    const clickY = Math.round(((e.clientY - rect.y) / rect.height) * 1000) / 1000;
    const foundCharacter = characters.find((character) => 
      hasClickedOnCharacter(clickX, clickY, character)
    )
    setClickMarker({ x: clickX, y: clickY });
    setClickedCharacter(foundCharacter || false);
  };
  
  // __________________________________

  useEffect(() => {
    let fadeTimer, clearAlert;
    const baseClass = "transition-opacity duration-500";
    
    if(clickedCharacter === null) return;
    
    if(clickedCharacter) {
      setCharacters((prevCharacters) => 
        prevCharacters.map((character) =>
          character.name === clickedCharacter.name
        ? { ...character, clicked: true }
        : character
      ));
    
    showAlert(
      <div role="alert" className="alert alert-success w-64
        transition-opacity duration-1200 opacity-0 ease-custom-ease">
        <span className='font-[700] w-fit m-auto'>'🎉&nbsp;&nbsp;&nbsp;Yay, you found {capitalize(clickedCharacter.name)}&nbsp;&nbsp;&nbsp;🎉'</span>
      </div>
    );
      // should update game status with clicked character here now
      // check whether all chars found and if so stop clock and alert win
    } else if (clickMarker && !clickedCharacter) {
      showAlert(
        <div role="alert" className="alert alert-error w-64
          transition-opacity duration-1200 opacity-0 ease-custom-ease">
          <span className='font-[700]'>No character found here.&nbsp;&nbsp;👎</span>
        </div>
      );    
    };
    
    setTimeout(() => {
      showAlert(null)
    }, 1200);

    setClickedCharacter(null);

  }, [clickedCharacter]);
  
  // __________________________________

  return(
    <div data-testid="game-section" className="w-full flex justify-center pt-16">
      <div className="relative w-[80vw] max-w-[1400px]">
        <img
          ref={imageRef}
          src={waldoScene1}
          id="waldo-scene-1"
          onClick={handleImageClick}
          className="w-full border-2 rounded"
          alt="Waldo scene 1"
        />
        {clickMarker && (
          <div
            className="absolute border-4 border-blue-800 w-6 h-8 pointer-events-none"
            style={{
              left: `${clickMarker.x * 100}%`,
              top: `${clickMarker.y * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}>
          </div>
        )}
        { characters.map((char) => {
          if(char.clicked) {
            return(
              <div
                key={char.name}
                className="absolute border-4 border-green-600 pointer-events-none p-2"
                style={{
                  left: `${char.startX * 100}%`,
                  top: `${char.startY * 100}%`,
                  width: `${(char.endX - char.startX) * 100}%`,
                  height: `${(char.endY - char.startY) * 100}%`,
                }}>

              </div>
            )
          }
        })}
      </div>
    </div>
  )
}