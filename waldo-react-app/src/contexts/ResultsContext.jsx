import { useState, createContext } from "react"

const ResultsContext = createContext()

export default function ResultsProvider({children}) {
  const [ activeTabImageId, setActiveTabImageId ] = useState(null)

  const value = {
    activeTabImageId,
    setActiveTabImageId
  }
  
  return(
    <ResultsContext.Provider value={value}>
      {children}
    </ResultsContext.Provider>
  )
};

export { ResultsContext };