import { useState, useEffect, useContext } from "react"
import { UIContext } from "../contexts/UIContext"

export default function Alert() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState(null)
  const { alert } = useContext(UIContext);

  useEffect(() => {
    if (alert) {
      setMessage(alert);
      setVisible(true)
    } else if (visible) {
      const timeout = setTimeout(() => {
        setVisible(false)
        setMessage(null)
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [alert, visible])
  
  if (!visible) return null;

  return(
    <div data-testid="alert" id="alert"
      className={`fixed top-1 left-1/2 -translate-x-1/2 z-100 px-4 rounded bg-[var(--color-bg-tertiary)]
        text-sm text-[var(--color-text-alert)] [font-variation-settings:'wght'_600]
        underline underline-offset-2 decoration-single decoration-2 decoration-[var(--color-decoration-fuchsia)]
        transition-opacity duration-2000 ease-out animate-slide-bounce-in
        ${alert ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {message}
    </div>
  )
}