import { createContext, useState, useRef } from "react"

const UIContext = createContext();

export default function UIProvider({children}) {
  const [ alert, setAlert ] = useState(null);
  const alertTimeout = useRef(null);

  // set alert, set a timeout fn in a useRef to reset alert to null and clear the timeout
  function showAlert(msg) {
    setAlert(msg);
    if(alertTimeout.current) { clearTimeout(alertTimeout.current) };
    alertTimeout.current = setTimeout(() => setAlert(null), 1500);
  }

  const value = {
    alert,
    setAlert,
    showAlert
  };

  return(
    < UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}

export { UIContext };