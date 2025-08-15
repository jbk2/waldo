import './assets/stylesheets/index.css'
import { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext';
import Navbar from './components/Navbar'
import Alert from './components/Alert';

export default function App() {
  const { authenticate, authChecked } = useContext(AuthContext);

  // only on mount - call Rails api/session, with session_id cookie, to authenticate user
  useEffect(() => {
    authenticate();
  }, [authenticate])

  if (!authChecked) return <div className="grid place-items-center min-h-screen font-bold text-xl">Loading...</div>;

  return (
    <>
      <Alert />
      <Navbar />
      <main className='min-h-[calc(100vh-8rem)]'>
      {/* <main className='pt-[calc(4rem+1rem)] xl:pt-[8rem] min-h-[calc(100vh-4rem)] xl:min-h-[calc(100vh-8rem)]'> */}
        <Outlet context={{}} />
      </main>
    </>
  )
}
