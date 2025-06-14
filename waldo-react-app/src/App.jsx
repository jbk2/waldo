import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
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
        showAlert(data.error || "Authentication failed, fetch response not ok, and was no JSON response errors object");  
      }
    })
    .catch(() => setAuthChecked(true));
  }, []);

  // set alert, set a timeout fn in a userRef, and reset alert to null and clear the timeout
  const showAlert = (msg) => {
    setAlert(msg)
    if (alertTimeout.current) { clearTimeout(alertTimeout.current) };
    alertTimeout.current = setTimeout(() => setAlert(null), 1500);
  }

  const signIn = (e) => {
    e.preventDefault();
    fetch("/api/session", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: e.target.email_address.value,
        password: e.target.password.value,
      }),
    })
    .then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        setLoggedIn(true)
        showAlert(data.notice);
        navigate('/');
      } else {
        showAlert(
          data.error ||
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
    // user create & session new
    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email_address: e.target.email_address.value,
          password: e.target.password.value,
          password_confirmation: e.target.password_confirmation.value,
        },
      }),
    })
    .then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        showAlert(data.notice);
      } else {
        showAlert(
          data.errors
            ? data.errors.join(", ")
            : "Sign up failed, fetch response not ok, and was no JSON response errors object"
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
        showAlert(data.notice);
        navigate('/');
      } else {
        showAlert(
          data.error ||
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
    const password = formData.get('password')
    const password_confirmation = formData.get('password_confirmation')

    fetch(`api/passwords/${token}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: password,
        password_confirmation: password_confirmation
      })
    })
    .then(async (res) => {
      const data = await res.json();
      if(res.ok) {
        showAlert(data.notice);
        navigate('/');
      } else {
        showAlert(data.error)
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
      <Navbar alert={alert} characters={characters} loggedIn={loggedIn} logOut={logOut} user={user} />
      <main className='pt-[8rem] min-h-[calc(100vh-8rem)]'>
        <Outlet context={{signIn, signUp, requestResetPassword, resetPassword, loggedIn, showAlert, characters, setCharacters}} />
      </main>
    </>
  )
}
