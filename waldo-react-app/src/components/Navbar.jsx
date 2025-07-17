import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ScoreBoard from './ScoreBoard';
import CharacterStatus from './CharacterStatus';
import { AuthContext } from '../contexts/AuthContext';


export default function Navbar() {
  const navigate = useNavigate();
  const { signedIn, signOut } = useContext(AuthContext);

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
            onClick={() => navigate('/')}
            >Where's Waldo?</h1>
        </div>
        
        <div data-testid='scoreboard-col' className='flex ml-24 items-center'>
          {signedIn
            && (
              <>
                <ScoreBoard />
                <button type="button" onClick={() => signOut()} className='btn w-fit ml-2'>
                  LogOut
                </button>
              </>
            )
          }
        </div>
      <hr className='col-span-3'/>
      </header>
    </>
  )
}