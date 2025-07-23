import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ScoreBoard from './ScoreBoard';
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
    window.location.reload();
  }

  return(
    <>
      <header className='grid grid-cols-[1fr_auto_1fr] items-center w-full
        fixed top-0 z-50 h-[8rem] bg-white'>
        <div data-testid='character-status-col' className='flex gap-8 mt-3 justify-end mr-20'>
          <CharacterStatus />
        </div>
        
        <div data-testid="typemark-col">
          <h1
            className="font-playrite text-6xl text-center my-8 hover:cursor-pointer"
            onClick={handleHomeClick}
            >Where's Waldo?
          </h1>
        </div>
        
        <div data-testid='scoreboard-col' className='flex ml-24 items-center'>
          <ScoreBoard />
          {signedIn ?
            <>
              <button type="button" onClick={handleSignOut} className='btn w-20 ml-2'>
                SignOut
              </button>
            </>
            :
            <>
              <button type="button" onClick={handleSignIn} className='btn w-20 ml-2'>
                SignIn
              </button>
            </>
          }
        </div>
      <hr className='col-span-3'/>
      </header>
    </>
  )
}