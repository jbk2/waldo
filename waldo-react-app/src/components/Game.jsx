import { capitalize } from '../utils/stringUtils';
import waldoScene1 from '../assets/images/waldo-scene1.jpg';
import { useRef, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import StartGameDialog from './StartGameDialog';
import EndGameDialog from './EndGameDialog';
import { UIContext } from '../contexts/UIContext';

export default function Game() {
  const imgRef = useRef();
  const { showAlert, showConfetti, gameImgBlured, clickCoords, setClickCoords } = useContext(UIContext);
  const { characters, setCharacters, completeGame, gameRunning, gamePlayed } = useContext(GameContext)
  
  function hasClickedOnACharacter(clickX, clickY, character) {
    return(
      clickX >= character.startX && clickX <= character.endX &&
      clickY >= character.startY && clickY <= character.endY
    )
  }

  function handleImageClick(e) {
    if(!gameRunning) return null;

    const imgRect = imgRef.current.getBoundingClientRect();
    const clickX = Math.round(((e.clientX - imgRect.x) / imgRect.width) * 1000) / 1000;
    const clickY = Math.round(((e.clientY - imgRect.y) / imgRect.height) * 1000) / 1000;
    setClickCoords({ x: clickX, y: clickY });
    
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
        completeGame();
        showConfetti();
      } else {
        showAlert(`🎉 Yay, you found ${capitalize(foundCharacter.name)} 🎉`);
      }
      setCharacters(updatedCharacters);
    } else {
      showAlert('No character found here. 👎');    
    };
  };
  
  return(
    <div data-testid="game-section" className="w-full flex justify-center pt-16">
      <div className="relative w-[80vw] max-w-[1400px]">
        <img
          ref={imgRef}
          src={waldoScene1}
          id="waldo-scene-1"
          onClick={handleImageClick}
          className={`w-full border-2 rounded ${gameImgBlured && 'blur-xs opacity-80'}
            ${gameRunning && 'hover:cursor-pointer'}`}
          alt="Waldo scene 1"
        />
        {clickCoords &&
        <div
          className="absolute border-4 border-blue-800 w-6 h-8 pointer-events-none"
          style={{
            left: `${clickCoords.x * 100}%`,
            top: `${clickCoords.y * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}>
        </div>
      }
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
        { !gameRunning && !gamePlayed && <StartGameDialog /> }
        { !gameRunning && gamePlayed && <EndGameDialog /> }

      </div>
    </div>
  )
}

