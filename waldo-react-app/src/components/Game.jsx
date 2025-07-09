import { capitalize } from '../utils/stringUtils';
import waldoScene1 from '../assets/images/waldo-scene1.jpg';
import { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';
import StartGameDialog from './StartGameDialog';


export default function Game() {
  const { showAlert, characters, setCharacters } = useOutletContext();
  const imageRef = useRef();
  const [ clickMarker, setClickMarker ] = useState(null);
  const [ clickedCharacter, setClickedCharacter ] = useState(null);

  useEffect(() => {
    if(clickedCharacter === null) return;
    
    if(clickedCharacter) {
      setCharacters((prevCharacters) => 
        prevCharacters.map((character) =>
          character.name === clickedCharacter.name
        ? { ...character, clicked: true }
        : character
      ));
    
      showAlert(`🎉 Yay, you found ${capitalize(clickedCharacter.name)} 🎉`);

      // should update game status with clicked character here now
      // check whether all chars found and if so stop clock and alert win
    } else if (clickMarker && !clickedCharacter) {
      showAlert('No character found here. 👎');    
    };
    
    setTimeout(() => {
      showAlert(null)
    }, 1200);

    setClickedCharacter(null);

  }, [clickedCharacter]);
  
  
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

  function removeImgBlur() {
    imageRef.current.classList.remove('blur-sm')
  }
  
  return(
    <div data-testid="game-section" className="w-full flex justify-center pt-16">
      <div className="relative w-[80vw] max-w-[1400px]">
        <img
          ref={imageRef}
          src={waldoScene1}
          id="waldo-scene-1"
          onClick={handleImageClick}
          className="w-full border-2 rounded blur-sm"
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
        <StartGameDialog removeImgBlur={removeImgBlur} />
      </div>
    </div>
  )
}

