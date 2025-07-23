import { capitalize } from '../utils/stringUtils';
import placeholderImg from '../assets/images/waldo-scene1.jpg';
import { useRef, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import StartGameDialog from './StartGameDialog';
import EndGameDialog from './EndGameDialog';
import { UIContext } from '../contexts/UIContext';
import { ImagesContext } from '../contexts/ImagesContext';

export default function Game() {
  const imgRef = useRef();
  const { showAlert, showConfetti, gameImgBlured, clickCoords, setClickCoords } = useContext(UIContext);
  const { gameImage, characters, setCharacters, completeGame, gameRunning, gamePlayed, imageLoading,
    setImageLoading, setImageLoaded, startGame } = useContext(GameContext)

  // console.log('Game render - gameRunning:', gameRunning, 'gamePlayed:', gamePlayed);

  function hasClickedOnACharacter(clickX, clickY, character) {
    return(
      clickX >= character.startX && clickX <= character.endX &&
      clickY >= character.startY && clickY <= character.endY
    )
  }

  function handleImageLoad() {
    console.log('Image loaded successfully');
    setImageLoaded(true);
    setImageLoading(false); // Stop loading spinner when image loads
    startGame();
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
        {/* Show placeholder when no game image */}
        {!gameImage ? (
          <img
            src={placeholderImg}
            className={`w-full border-2 rounded ${gameImgBlured && 'blur-xs opacity-80'}`}
            alt="placeholderImage"
          />
        ) : (
          /* Show the actual game image */
          <img
            ref={imgRef}
            src={gameImage.url}
            onLoad={handleImageLoad}
            onClick={handleImageClick}
            className={`w-full border-2 rounded ${gameImgBlured && 'blur-xs opacity-80'}
              ${gameRunning && 'hover:cursor-pointer'}`}
          />
        )}
        
        {/* Show loading overlay when loading */}
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-700 text-lg">Loading game image...</p>
              <p className="text-gray-500 text-sm mt-2">Please wait while the high-resolution image loads</p>
            </div>
          </div>
        )}
        
        {/* add click location visual border */}
        {clickCoords && gameImage && gameImage.url !== placeholderImg && (
          <div
            className="absolute border-4 border-blue-800 w-6 h-8 pointer-events-none"
            style={{
              left: `${clickCoords.x * 100}%`,
              top: `${clickCoords.y * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}>
          </div>
        )}

        {/* sets character boundary marker if character clicked */}
        {gameImage && gameImage.url !== placeholderImg && characters && characters.map((char) => {
          if(char.clicked) {
            return(
              <div
                key={char.id}
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

