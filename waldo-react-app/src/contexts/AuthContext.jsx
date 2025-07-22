import { createContext, useState, useContext, useCallback } from "react";
import { UIContext } from "./UIContext";

const AuthContext = createContext();

export default function AuthProvider({children}) {
  const [ signedIn, setSignedIn ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ authChecked, setAuthChecked ] = useState(false);
  const { showAlert } = useContext(UIContext);

  
  const authenticate = useCallback(function authenticate() {
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
        console.log(data.message || "Authentication failed, fetch response not ok, and was no JSON response errors object");
      }
    })
    .catch((error) => {
      console.trace("Authentication fetch failed:", error);
      setAuthChecked(true);
      showAlert(`Auth fetch failed: ${error.message}`);
    })
  }, [showAlert])

  function signUp(formData, navigate) {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email_address: formData.get('email_address'),
          password: formData.get('password'),
          password_confirmation: formData.get('password_confirmation'),
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
  
  function signIn(formData, navigate, navState) {
    fetch("/api/session", {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: formData.get('email_address'),
        password: formData.get('password'),
      }),
    })
    .then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        setSignedIn(true)
        showAlert(data.message);
        if(navState) {
          navigate(navState.nextRoute, { state: { pastGameTime: navState.pastGameTime} })
        } else {
          navigate('/');
        }
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

  function requestResetPassword(formData, navigate) {
    fetch(`/api/passwords`, {
      method: "POST",
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email_address: formData.get('email_address')
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
  }

  function resetPassword(formData, token, navigate) {
    fetch(`/api/passwords/${token}`, {
      method: "PATCH",
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: formData.get('new_password'),
        password_confirmation: formData.get('new_password_confirmation')
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
  
  const value = {
    authenticate,
    authChecked,
    signUp,
    signIn,
    signOut,
    requestResetPassword,
    resetPassword,
    signedIn,
    user
  };

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext};