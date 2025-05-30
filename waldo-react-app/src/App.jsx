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
        console.log('heres the fetch data', data);
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

  if (!authChecked) return <div className="grid place-items-center min-h-screen font-bold text-xl">Loading...</div>;

  return (
    <>
      <Navbar alert={alert} characters={characters} />
      <main>
        <Outlet context={{loggedIn, setLoggedIn, handleSignIn, setAlert, characters, setCharacters}} />
      </main>
    </>
  )
}

export default App
