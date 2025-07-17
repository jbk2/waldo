import { createContext, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { UIContext } from "./UIContext";

const AuthContext = createContext();

export default function AuthProvider({children}) {
  // const navigate = useNavigate();
  const [ signedIn, setSignedIn ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ authChecked, setAuthChecked ] = useState(false);
  const { showAlert } = useContext(UIContext);

  
  function authenticate() {
    fetch('/api/session', {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    })
    .then(async res => {
      const data = await res.json();
      if(res.ok) {
        console.log("user successfully authd");
        setAuthChecked(true);
        setUser(data.user);
        setSignedIn(true);
      } else {
        setSignedIn(false)
        setAuthChecked(true)
        showAlert(data.message || "Authentication failed, fetch response not ok, and was no JSON response errors object");
      }
    })
    .catch((error) => {
      console.trace("Authentication fetch failed:", error);
      setAuthChecked(true);
      showAlert(`Auth fetch failed: ${error.message}`);
    })
  }
  
  function signIn(formData, navigate) {
    const email_address = formData.get('email_address')
    const password = formData.get('password')

    fetch("/api/session", {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
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
        setSignedIn(true)
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
  }
  
  function signOut() {
    fetch('/api/session', {
      method: 'DELETE',
      headers: { 
        "Accept": "application/json"
      },
    })
    .then(async res => {
      const data = await res.json();
      if (res.ok) {
        showAlert(data.message)
        setUser(null)
        setSignedIn(false)
      } else {
        showAlert(data.message || "Log out failed"
        )
      }
    })
  }

  function signUp(formData, navigate) {
    const email_address = formData.get('email_address')
    const password = formData.get('password')
    const password_confirmation = formData.get('password_confirmation')
    
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
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
  
  const value = { authenticate, authChecked, signUp, signIn, signOut, signedIn, user };

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext};