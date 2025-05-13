import Navbar from '/src/components/Navbar'
import GamePage from '../components/GamePage'

export default function HomePage() {

  return(
    <>
      <Navbar />
        <p className='bg-debug'>App Initialised and connected</p>
      <GamePage />
    </>
  )
}