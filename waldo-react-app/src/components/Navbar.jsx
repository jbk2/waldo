import ScoreBoard from './ScoreBoard';

export default function Navbar({alert}) {
  
  return(
    <>
      <header className='grid grid-cols-[1fr_auto_1fr] items-center w-full
        fixed top-0 z-50 bg-white'>
        <div id='reserved-col'></div>
        <div id="typemark">
          <h1 className="font-playrite text-6xl font-[400]
            text-center my-8">Where's Waldo?</h1>
        </div>
        <div className='flex justify-center'>
          <ScoreBoard alert={alert} />
        </div>
      </header>
    </>
  )
}