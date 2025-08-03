import { createContext, useRef, useCallback } from 'react';

const TimerContext = createContext();

export default function TimerProvider({ children }) {
  const startTimeRef = useRef(null);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
  }, []);

  const stopTimer = useCallback(() => {
    const finalTime = Date.now() - startTimeRef.current;
    return finalTime;
  }, []);

  const getStartTime = useCallback(() => {
    return startTimeRef.current;
  }, []);

  const value = {
    startTimer,
    stopTimer,
    getStartTime
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}

export { TimerContext };