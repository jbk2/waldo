import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GameTimer from './GameTimer';
import CharacterStatus from './CharacterStatus';
import { AuthContext } from '../contexts/AuthContext';
import { GameContext } from '../contexts/GameContext';
// import Game from './Game';


export default function Navbar() {
  const navigate = useNavigate();
  const { signedIn, signOut } = useContext(AuthContext);
  const { resetGame } = useContext(GameContext);

  function handleSignIn() {
    resetGame();
    navigate('sign-in');
  }
  
  function handleSignOut() {
    signOut();
    resetGame();
    navigate('/');
  }

  function handleHomeClick() {
    // window.location.reload();
    resetGame();
    navigate('/');
  }

  return(
    <>
      <header className='grid grid-cols-[1fr_auto_1fr] items-center w-full
        fixed top-0 z-50 h-[8rem] bg-white'>
        <div data-testid='character-status-col' className='flex gap-8 mt-3 justify-end mr-20'>
          <CharacterStatus />
        </div>
        
        <div data-testid="typemark-col" className='mb-2'>
          <h1
            className="font-playrite text-6xl text-center mt-8 hover:cursor-pointer"
            onClick={handleHomeClick}
            >Where's Waldo?
          </h1>
          {signedIn && (
            <div className='flex justify-end'>
              <Link to='/competition-board' className='text-xs text-green-500 font-variation-settings-wght-600
                underline decoration-indigo-400 underline-offset-3 decoration-wavy decoration-1
                hover:scale-104 transition-transform origin-center transform-gpu'>
                Competition Board
              </Link>
            </div>
          )}
        </div>
        <div className='flex flex-col ml-24 gap-1 overflow-visible'>
          <div data-testid='gametimer-col' className='flex items-center'>
            <GameTimer />
            {signedIn ?
              <button type="button" onClick={handleSignOut} className='btn w-20 ml-2'>
                SignOut
              </button>
              :
              <button type="button" onClick={handleSignIn} className='btn w-20 ml-2'>
                SignIn
              </button>
            }
          </div>
          
        </div>
      <hr className='col-span-3'/>
      </header>
    </>
  )
}