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

  return(
    <>
      <header className='grid grid-cols-[4fr_auto_5fr] lg:grid-cols-[1fr_auto_1fr] gap-4 p-3 items-center w-full
        fixed top-0 z-50 h-fit xl:h-[8rem] bg-white border-b-1 overflow-hidden'>
        <div data-testid='character-status-col' className='flex flex-col md:flex-row gap-2 md:gap-4 xl:gap-8 mt-3 xl:justify-end xl:mr-20'>
          <CharacterStatus />
        </div>
        
        <div data-testid="typemark-col" className='mb-2 text-center'>
          <Link to={'/'} onClick={resetGame} className='font-playrite text-4xl md:text-5xl xl:text-6xl text-center mt-8
            hover:cursor-pointer'>
            Where's Waldo?
          </Link>
            <div className='flex justify-center xl:justify-end'>
              <Link to='/competition-board' onClick={resetGame} className='text-xs text-green-500
                font-variation-settings-wght-600 underline decoration-indigo-400 underline-offset-3
                decoration-wavy decoration-1 hover:scale-104 transition-transform origin-center transform-gpu'>
                Competition Board
              </Link>
            </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div data-testid='gametimer-col' className='flex flex-col xl:flex-row ml-10 md:ml-16 xl:ml-24'>
            <GameTimer />
            {signedIn ?
              <button type="button" onClick={handleSignOut} className='btn w-20 ml-2'>
                SignOut
              </button>
              :
              <button type="button" onClick={handleSignIn} className='btn w-20'>
                SignIn
              </button>
            }
          </div>
        </div>
      </header>
    </>
  )
}