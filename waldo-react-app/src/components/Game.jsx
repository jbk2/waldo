import { capitalize } from '../utils/stringUtils';
import waldoScene1 from '../assets/images/waldo-scene1.jpg';
import { useState, useRef, useEffect, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';
import StartGameDialog from './StartGameDialog';


export default function Game() {
  const { showAlert, characters, setCharacters } = useOutletContext();
  const imageRef = useRef();
  const { stopGame } = useContext(GameContext)
  const [ clickMarker, setClickMarker ] = useState(null);
  const [ clickedCharacter, setClickedCharacter ] = useState(null);
  const [ gameCompleted, setGameCompleted ] = useState(false)

  // handles updating characters clicked state, & alerting
  useEffect(() => {
    if(gameCompleted) {
      // do appropriate UI thing to:
      // - stop any more clicking
      // - congratulate completed game
      // - show game completed time
      // - update game time to scoreboard
    }

    return () => {
      // setClickMarker(null);
      setClickedCharacter(null);
    };

  }, [gameCompleted]);
  
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
    
    setClickMarker({ x: clickX, y: clickY });
    
    const foundCharacter = characters.find((character) => 
      hasClickedOnCharacter(clickX, clickY, character)
    )

    if(foundCharacter) { 
      setClickedCharacter(foundCharacter)
      
      const updatedCharacters = characters.map((character) =>
        character.name === foundCharacter.name
          ? { ...character, clicked: true }
          : character
      );
      const allCharactersClicked = updatedCharacters.every((character) => character.clicked === true);

      if(allCharactersClicked) {
        console.log("from Game's useEffect - all chars are clicked");
        setGameCompleted(true)
        showAlert(`🎉 Yay, you clicked all characters 🎉`);
        stopGame();
      } else {
        showAlert(`🎉 Yay, you found ${capitalize(foundCharacter.name)} 🎉`);
      }

      setCharacters(updatedCharacters);
    } else {
      showAlert('No character found here. 👎');    
    };
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
        {/* sets click boundary marker */}
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
        <StartGameDialog removeImgBlur={removeImgBlur} />
      </div>
    </div>
  )
}

