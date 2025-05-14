import { capitalize } from '../utils/stringUtils';
import { initialCharacters } from '../data/characters'
import waldo1 from '../assets/images/waldo1.jpg';
import { useState, useRef, useEffect } from 'react';

export default function Game({setAlert}) {
  const imageRef = useRef();
  const [ characters, setCharacters ] = useState(initialCharacters);
  const [ clickMarker, setClickMarker ] = useState(null);
  const [ clickedCharacter, setClickedCharacter ] = useState(null);
  
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
  
  useEffect(() => {
    if(clickedCharacter === null) return;

    if(clickedCharacter) {
      setCharacters((prevCharacters) => 
        prevCharacters.map((character) =>
          character.name === clickedCharacter.name
            ? { ...character, clicked: true }
            : character
        )  
      );

      setAlert(
        <div role="alert" className="alert alert-success">
          <span>'Yay, you found {capitalize(clickedCharacter.name)}'</span>
        </div>
      );
      // should update game status with clicked character here now
      // check whether all chars found and if so stop clock and alert win
    } else if (clickMarker && !clickedCharacter) {
      setAlert(
        <div role="alert" className="alert alert-error">
          <span>Nope, no character found here.</span>
        </div>
      );

    };
    
    setTimeout(() => {
      setAlert(null)
    }, 800);

    setClickedCharacter(null);
  }, [clickedCharacter]);

  return(
    <div data-testid="game-section" className="w-full flex justify-center pt-40">
      <div className="relative w-[80vw] max-w-[1400px]">
        <img
          ref={imageRef}
          src={waldo1}
          onClick={handleImageClick}
          className="w-full border-2 rounded"
          alt="Waldo"
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
      </div>
    </div>
  )
}