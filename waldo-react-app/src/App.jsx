import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'
import './assets/stylesheets/index.css'
import HomePage from '/src/routes/HomePage'
import { initialCharacters } from './data/characters'
import Navbar from './components/Navbar'

function App() {
  const [ alert, setAlert ] = useState(null)
  const [ characters, setCharacters ] = useState(initialCharacters);
  const [ loggedIn, setLoggedIn ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ authChecked, setAuthChecked ] = useState(false);

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
    
  useEffect(() => {
    console.log('heres user ', user);
    console.log('heres loggedIn', loggedIn);
    console.log('heres authChecked', authChecked);
  }, [authChecked, loggedIn, user]);

  const handleSignIn = (responseData) => {
    console.log('heres the responseData', responseData);
    setUser(responseData.user);
    setLoggedIn(responseData.authenticated);
  }

  const logOut = (e) => {
    console.log('navbar logOut button clicked')
    //must delete cookie and session on rails server
    fetch('/api/session', {
      method: 'DELETE'
    })
    .then(async res => {
      const data = await res.json();
      if (res.ok) {
        console.log('session delete response was ok, response is here =>', data)
        setAlert(data.notice)
        setLoggedIn(false)
      } else {
        console.log('session delete response was not ok, response is here =>', data)
        setAlert(data.errors
          ? data.errors.join(', ')
          : "Log out failed, and no errors object in JSON response"
        )
      }
    })
  }

  if (!authChecked) return <div className="grid place-items-center min-h-screen font-bold text-xl">Loading...</div>;

  return (
    <>
      <Navbar alert={alert} characters={characters} loggedIn={loggedIn} logOut={logOut} />
      <main>
        <Outlet context={{loggedIn, handleSignIn, setAlert, characters, setCharacters}} />
      </main>
    </>
  )
}

export default App
