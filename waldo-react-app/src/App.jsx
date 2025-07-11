import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import './assets/stylesheets/index.css'
import HomePage from '/src/routes/HomePage'
import { initialCharacters } from './data/characters'
import Navbar from './components/Navbar'
import Alert from './components/Alert';
import Confetti from './components/Confetti';
import GameProvider from './contexts/GameContext'

export default function App() {
  const [ alert, setAlert ] = useState(null)
  const [ characters, setCharacters ] = useState(initialCharacters);
  const [ loggedIn, setLoggedIn ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ authChecked, setAuthChecked ] = useState(false);
  const alertTimeout = useRef(null)
  const confettiRef = useRef(null);
  const navigate = useNavigate();

  // only on mount - call Rails api/session, with session_id cookie, to authenticate user
  useEffect(() => {
    fetch('/api/session', { credentials: 'include' })
    .then(async res => {
      const data = await res.json();
      if(res.ok) {
        console.log("User authenticated, navigating to /");
        setAuthChecked(true);
        setUser(data.user);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);  
        setAuthChecked(true);
        showAlert(data.message || "Authentication failed, fetch response not ok, and was no JSON response errors object");  
      }
    })
    .catch(() => setAuthChecked(true));
  }, []);

  // set alert, set a timeout fn in a useRef, and reset alert to null and clear the timeout
  const showAlert = (msg) => {
    setAlert(msg)
    if (alertTimeout.current) { clearTimeout(alertTimeout.current) };
    alertTimeout.current = setTimeout(() => setAlert(null), 1500);
  }

  function launchConfetti() {
    if(confettiRef.current) { 
      confettiRef.current.innerHTML = ''; // Clear previous confetti
    }
  
    const confettiCount = 120;
  
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti-piece');
      
      // Random horizontal position and slight staggered delay
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.top = `${Math.random() * -120 - 30}vh`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
  
      confettiRef.current.appendChild(confetti);
    }
  }

  const signIn = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const email_address = formData.get('email_address')
    const password = formData.get('password')

    fetch("/api/session", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email_address,
        password: password,
      }),
    })
    .then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        setLoggedIn(true)
        showAlert(data.message);
        navigate('/');
      } else {
        showAlert(
          data.message ||
            "Sign in failed, fetch response not ok, and was no JSON response errors object"
        );
      }
    })
    .catch((err) => {
      showAlert(
        err.message ||
          "Sign in failed, fetch threw an error, and there was no err.message object"
      );
    });
  };

  const signUp = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const email_address = formData.get('email_address')
    const password = formData.get('password')
    const password_confirmation = formData.get('password_confirmation')
    // user create & session new
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email_address: email_address,
          password: password,
          password_confirmation: password_confirmation,
        },
      }),
    })
    .then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        navigate('/sign-in');
        showAlert(data.message);
      } else {
        showAlert(
          data.message ||
            "Sign up failed, fetch response not ok, and was no JSON response errors object"
        );
      }
    })
    .catch((err) => {
      showAlert(
        err.message ||
          "Sign up failed, fetch threw an error, and there was no err.message object"
      );
    });
  }

  const requestResetPassword = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email_address = formData.get('email_address')

    fetch(`/api/passwords`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email_address: email_address
      })
    })
    .then(async (res) => {
      const data = await res.json();
      if(res.ok) {
        showAlert(data.message);
        navigate('/');
      } else {
        showAlert(
          data.message ||
            "Password reset request failed, fetch response not ok, and was no JSON response errors object"
        );
      }
    })
    .catch((err) => {
      showAlert(
        err.message ||
          "Sign in failed, fetch threw an error, and there was no err.message object"
      );
    }) 
  };

  const resetPassword = (e, token) => {
    // submit token ad password value to rails password update action, if success route to login screen.
    e.preventDefault();
    const formData = new FormData(e.target);
    const new_password = formData.get('new_password')
    const new_password_confirmation = formData.get('new_password_confirmation')

    fetch(`api/passwords/${token}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: new_password,
        password_confirmation: new_password_confirmation
      })
    })
    .then(async (res) => {
      const data = await res.json();
      if(res.ok) {
        showAlert(data.message);
        navigate('/');
      } else {
        showAlert(data.message)
        navigate('request-reset-password')
      }
    })
    .catch((err) => {
      showAlert(
        err.message ||
          "Password update failed, fetch to server threw an error, and there was no err.message object"
      );
    }) 
  }

  const logOut = () => {
    fetch('/api/session', {
      method: 'DELETE'
    })
    .then(async res => {
      const data = await res.json();
      if (res.ok) {
        showAlert(data.message)
        setUser(null)
        setLoggedIn(false)
      } else {
        showAlert(data.message || "Log out failed"
        )
      }
    })
  }

  if (!authChecked) return <div className="grid place-items-center min-h-screen font-bold text-xl">Loading...</div>;

  return (
    <>
      <GameProvider>
        <Confetti ref={confettiRef} />
        <Alert alert={alert} />
        <Navbar characters={characters} loggedIn={loggedIn} logOut={logOut} user={user} />
        <main className='pt-[8rem] min-h-[calc(100vh-8rem)]'>
          <Outlet context={{signIn, signUp, requestResetPassword, resetPassword, loggedIn, showAlert, launchConfetti, characters, setCharacters}} />
        </main>
      </GameProvider>
    </>
  )
}
