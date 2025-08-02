import { createContext, useRef, useCallback } from 'react';

const TimerContext = createContext();

export default function TimerProvider({ children }) {
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedTimeRef = useRef(0);

  const startTimer = useCallback(() => {
    if(intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  
    elapsedTimeRef.current = 0;
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      elapsedTimeRef.current = Date.now() - startTimeRef.current;
    }, 20);
  }, []);

  const stopTimer = useCallback(() => {
    const finalTime = Date.now() - startTimeRef.current;
    if(intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return finalTime;
  }, []);

  const getElapsedTime = useCallback(() => {
    return elapsedTimeRef.current;
  }, []);

  const value = {
    startTimer,
    stopTimer,
    getElapsedTime
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}

export { TimerContext };