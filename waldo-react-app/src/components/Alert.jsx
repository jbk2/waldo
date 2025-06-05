import { useState, useEffect } from "react"

export default function Alert({ alert }) {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState(false)

  useEffect(() => {
    if (alert) {
      setMessage(alert);
      setVisible(true)
    } else if (visible) {
      const timeout = setTimeout(() => {
        setVisible(false)
        setMessage(null)
      }, 3500);
      return () => clearTimeout(timeout);
    }
  }, [alert, visible])
  
  if (!visible) return null;

  return(
    <div id="alert"
      className={`fixed top-1 left-1/2 -translate-x-1/2 z-100 px-4 text-sm text-cyan-700 bg-teal-50
        [font-variation-settings:'wght'_600] transition-opacity duration-2000 ease-in-out animate-slide-bounce-in
        underline underline-offset-2 decoration-single decoration-2 decoration-fuchsia-300  
        ${alert ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {message}
    </div>
  )
}