import { capitalize } from '../utils/stringUtils';
import placeholderImg from '../assets/images/waldo-scene1.jpg';
import { useRef, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import StartGameDialog from './StartGameDialog';
import EndGameDialog from './EndGameDialog';
import { UIContext } from '../contexts/UIContext';

export default function Game() {
  const imgRef = useRef();
  const { showAlert, showConfetti, gameImgBlured, setGameImgBlured, clickCoords, setClickCoords } = useContext(UIContext);
  const { gameImage, characters, setCharacters, completeGame, gameRunning, gamePlayed, imageLoading,
    setImageLoading, setImageLoaded, startGame } = useContext(GameContext)

  // console.log('Game render - gameRunning:', gameRunning, 'gamePlayed:', gamePlayed);

  function hasClickedOnACharacter(clickX, clickY, character) {
    return(
      clickX >= character.start_x && clickX <= character.end_x &&
      clickY >= character.start_y && clickY <= character.end_y
    )
  }

  function handleImageLoaded() {
    console.log('Image loaded into Game UI successfully');
    setGameImgBlured(false);
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
      setCharacters(updatedCharacters);
      
      const allCharactersClicked = updatedCharacters.every((character) => character.clicked === true);

      if(allCharactersClicked) {
        showAlert(`🎉 Yay, you found ${capitalize(foundCharacter.name)}, and all characters 🎉`);
        completeGame();
        showConfetti();
      } else {
        showAlert(`🎉 Yay, you found ${capitalize(foundCharacter.name)} 🎉`);
      }
    } else {
      showAlert('No character found here. 👎');    
    };
  };
  
  return(
    <div data-testid="game-section" className="w-full flex justify-center pt-16">
      <div className="relative w-[80vw] max-w-[1400px]">
        {/* Show placeholder when no game image */}
        {gameImage ? (
          <img
            ref={imgRef}
            src={gameImage.url}
            onLoad={handleImageLoaded}
            onClick={handleImageClick}
            className={`w-full border-2 rounded ${gameImgBlured && 'blur-xs opacity-80'}
              ${gameRunning && 'hover:cursor-pointer'}`}
          />
        ) : (
          <img
            src={placeholderImg}
            className={`w-full border-2 rounded ${gameImgBlured && 'blur-xs opacity-80'}`}
            alt="placeholderImage"
          />
        )}
        {/* Show loading overlay when loading */}
        {imageLoading && (
          <div className="absolute inset-8 rounded flex items-center justify-center -transform-y-20 bg-gray-100 bg-opacity-90 z-10">
            <div className="text-center absolute top-1/4">
              <div className="loading loading-spinner text-accent loading-xl mx-auto mb-4"></div>
              <p className="text-2xl">Loading game image...</p>
              <p className="text-lg mt-2">Please wait while a high-resolution image loads</p>
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
                className="absolute border-4 p-2 border-green-600 pointer-events-none"
                style={{
                  left: `${char.start_x * 100}%`,
                  top: `${char.start_y * 100}%`,
                  width: `${(char.end_x - char.start_x) * 100}%`,
                  height: `${(char.end_y - char.start_y) * 100}%`,
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

