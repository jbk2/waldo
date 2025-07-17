import { createContext, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { UIContext } from "./UIContext";

const AuthContext = createContext();

export default function AuthProvider({children}) {
  // const navigate = useNavigate();
  const { showAlert } = useContext(UIContext);

  
  function authenticate(setAuthChecked, setUser, setLoggedIn) {
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
        setLoggedIn(true);
      } else {
        setLoggedIn(false)
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
  
  // function signIn(event, setUser, setLoggedIn) {
  //   event.preventDefault();
  //   const formData = new FormData(event.target)
  //   const email_address = formData.get('email_address')
  //   const password = formData.get('password')

  //   fetch("/api/session", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email_address: email_address,
  //       password: password,
  //     }),
  //   })
  //   .then(async (res) => {
  //     const data = await res.json();
  //     if (res.ok) {
  //       setLoggedIn(true)
  //       showAlert(data.message);
  //       // navigate('/');
  //     } else {
  //       showAlert(
  //         data.message ||
  //           "Sign in failed, fetch response not ok, and was no JSON response errors object"
  //       );
  //     }
  //   })
  //   .catch((err) => {
  //     showAlert(
  //       err.message ||
  //         "Sign in failed, fetch threw an error, and there was no err.message object"
  //     );
  //   });
  // }
  
  
  const value = { authenticate};

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext};