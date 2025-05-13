import ScoreBoard from './ScoreBoard';

export default function Navbar() {
  
  return(
    <>
      <header className='flex items-center justify-center'>
        <div id="typemark">
          <h1 className="font-playrite text-6xl font-[400] mx-auto w-fit my-8">Where's Waldo?</h1>
        </div>
        <ScoreBoard />
      </header>
    </>
  )
}