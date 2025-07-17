import './assets/stylesheets/index.css'
import { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import { UIContext } from './contexts/UIContext';
import { AuthContext } from './contexts/AuthContext';
import Navbar from './components/Navbar'
import Alert from './components/Alert';

export default function App() {
  const { authenticate, authChecked } = useContext(AuthContext);

  // only on mount - call Rails api/session, with session_id cookie, to authenticate user
  useEffect(() => {
    authenticate();
  }, [])

  if (!authChecked) return <div className="grid place-items-center min-h-screen font-bold text-xl">Loading...</div>;

  return (
    <>
      <Alert />
      <Navbar />
      <main className='pt-[8rem] min-h-[calc(100vh-8rem)]'>
        <Outlet context={{}} />
      </main>
    </>
  )
}
