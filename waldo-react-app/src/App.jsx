import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom'
import './assets/stylesheets/index.css'
import HomePage from '/src/routes/HomePage'
import { initialCharacters } from './data/characters'
import Navbar from './components/Navbar'
import Alert from './components/Alert';

export default function App() {
  const [ alert, setAlert ] = useState(null)
  const [ characters, setCharacters ] = useState(initialCharacters);
  const [ loggedIn, setLoggedIn ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ authChecked, setAuthChecked ] = useState(false);
  const alertTimeout = useRef(null)

  // only on mount - call Rails api/session, with session_id cookie, to authenticate user
  useEffect(() => {
    fetch('/api/session', { credentials: 'include' })
    .then(res => res.json())
    .then(data => {
      setAuthChecked(true);
      setUser(data.user);
      setLoggedIn(data.authenticated);
    })
    .catch(() => setAuthChecked(true));
  }, []);

  // set alert, set a timeout fn in a userRef, and reset alert to null and clear the timeout
  const showAlert = (msg) => {
    setAlert(msg)
    if (alertTimeout.current) { clearTimeout(alertTimeout.current) };
    alertTimeout.current = setTimeout(() => setAlert(null), 1500);
  }

  // set local react state after authentiacted on Rails server
  const handleSignIn = (responseData) => {
    setUser(responseData.user);
    setLoggedIn(responseData.authenticated);
  }

  const logOut = (e) => {
    fetch('/api/session', {
      method: 'DELETE'
    })
    .then(async res => {
      const data = await res.json();
      if (res.ok) {
        showAlert(data.notice)
        setUser(null)
        setLoggedIn(false)
      } else {
        showAlert(data.errors
          ? data.errors.join(', ')
          : "Log out failed, and no errors object in JSON response"
        )
      }
    })
  }

  if (!authChecked) return <div className="grid place-items-center min-h-screen font-bold text-xl">Loading...</div>;

  return (
    <>
      <Alert alert={alert} />
      <Navbar alert={alert} characters={characters} loggedIn={loggedIn} logOut={logOut} />
      <main className='pt-[8rem] min-h-[calc(100vh-8rem)]'>
        <Outlet context={{loggedIn, handleSignIn, showAlert, characters, setCharacters}} />
      </main>
    </>
  )
}
