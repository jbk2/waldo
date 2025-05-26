import { useState } from 'react';
import { Outlet } from 'react-router-dom'
import './assets/stylesheets/index.css'
import HomePage from '/src/routes/HomePage'
import { initialCharacters } from './data/characters'
import Navbar from './components/Navbar'

function App() {

  const [ alert, setAlert ] = useState(null)
  const [ characters, setCharacters ] = useState(initialCharacters);

  return (
    <>
      <Navbar alert={alert} characters={characters} />
      <main>
        <Outlet context={{setAlert, characters, setCharacters}} />
      </main>
    </>
  )
}

export default App
