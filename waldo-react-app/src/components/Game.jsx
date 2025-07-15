import { capitalize } from '../utils/stringUtils';
import waldoScene1 from '../assets/images/waldo-scene1.jpg';
import { useState, useRef, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';
import StartGameDialog from './StartGameDialog';
import EndGameDialog from './EndGameDialog';

export default function Game() {
  const imageRef = useRef();
  const { showAlert, launchConfetti } = useOutletContext();
  const { characters, setCharacters, stopGame, gameRunning, gamePlayed } = useContext(GameContext)
  const [ clickLocation, setClickLocation ] = useState(null);
  const [blurImg, setBlurImg] = useState(true)
  
  function hasClickedOnACharacter(clickX, clickY, character) {
    return(
      clickX >= character.startX && clickX <= character.endX &&
      clickY >= character.startY && clickY <= character.endY
    )
  }

  function handleImageClick(e) {
    if(!gameRunning) return null;

    const rect = imageRef.current.getBoundingClientRect();
    const clickX = Math.round(((e.clientX - rect.x) / rect.width) * 1000) / 1000;
    const clickY = Math.round(((e.clientY - rect.y) / rect.height) * 1000) / 1000;
    
    setClickLocation({ x: clickX, y: clickY });
    
    const foundCharacter = characters.find((character) => 
      hasClickedOnACharacter(clickX, clickY, character)
    )

    if(foundCharacter) { 
      const updatedCharacters = characters.map((character) =>
        character.name === foundCharacter.name
          ? { ...character, clicked: true }
          : character
      );
      const allCharactersClicked = updatedCharacters.every((character) => character.clicked === true);

      if(allCharactersClicked) {
        showAlert(`🎉 Yay, you found ${capitalize(foundCharacter.name)}, and all characters 🎉`);
        stopGame();
        launchConfetti();
      } else {
        showAlert(`🎉 Yay, you found ${capitalize(foundCharacter.name)} 🎉`);
      }
      setCharacters(updatedCharacters);
    } else {
      showAlert('No character found here. 👎');    
    };
  };

  function removeImgBlur() {
    setBlurImg(false)
  }
  
  function addImgBlur() {
    setBlurImg(true)
  }
  
  return(
    <div data-testid="game-section" className="w-full flex justify-center pt-16">
      <div className="relative w-[80vw] max-w-[1400px]">
        <img
          ref={imageRef}
          src={waldoScene1}
          id="waldo-scene-1"
          onClick={handleImageClick}
          className={`w-full border-2 rounded ${blurImg && 'blur-xs opacity-80'}
            ${gameRunning && 'hover:cursor-pointer'}`}
          alt="Waldo scene 1"
        />
        {/* sets click boundary marker */}
        {clickLocation && (
          <div
          className="absolute border-4 border-blue-800 w-6 h-8 pointer-events-none"
          style={{
            left: `${clickLocation.x * 100}%`,
            top: `${clickLocation.y * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}>
          </div>
        )}
        {/* sets character boundary marker if character clicked */}
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
        { !gameRunning && !gamePlayed && <StartGameDialog removeImgBlur={removeImgBlur} /> }
        { !gameRunning && gamePlayed && <EndGameDialog /> }

      </div>
    </div>
  )
}

