import Confetti from "../components/Confetti";
import { createContext, useState, useRef } from "react"

const UIContext = createContext();

export default function UIProvider({children}) {
  const [ alert, setAlert ] = useState(null);
  const [ gameImgBlured, setGameImgBlured ] = useState(true)
  const alertTimeout = useRef(null);
  const confettiRef = useRef(null);

  // set alert, set a timeout fn in a useRef to reset alert to null and clear the timeout
  function showAlert(msg) {
    setAlert(msg);
    if(alertTimeout.current) { clearTimeout(alertTimeout.current) };
    alertTimeout.current = setTimeout(() => setAlert(null), 1500);
  }

  function showConfetti() {
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

  const value = {
    gameImgBlured,
    setGameImgBlured,
    alert,
    setAlert,
    showAlert,
    showConfetti
  };

  return(
    < UIContext.Provider value={value}>
      <Confetti ref={confettiRef} />
      {children}
    </UIContext.Provider>
  )
}

export { UIContext };