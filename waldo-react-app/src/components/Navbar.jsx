import ScoreBoard from './ScoreBoard';
import CharacterStatus from './CharacterStatus';


export default function Navbar({alert, characters, loggedIn, logOut}) {
  
  return(
    <>
      <header className='grid grid-cols-[1fr_auto_1fr] items-center w-full
        fixed top-0 z-50 h-[8rem] bg-white'>
        <div data-testid='character-status-col' className='flex gap-8 mt-3 justify-end mr-20'>
          <CharacterStatus characters={characters} />
        </div>
        
        <div data-testid="typemark-col">
          <h1 className="font-playrite text-6xl font-[400]
            text-center my-8">Where's Waldo?</h1>
        </div>
        
        <div data-testid='scoreboard-col' className='flex ml-24'>
          <ScoreBoard alert={alert} />
          {loggedIn
            && (
              <button type="button" onClick={() => logOut()} className='btn w-fit'>
              LogOut
            </button>
            )
          }
        </div>
      <hr className='col-span-3'/>
      </header>
    </>
  )
}