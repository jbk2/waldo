import { createContext, useContext, useState } from "react"
import { UIContext } from "./UIContext";

const ScoresContext = createContext();

export default function ScoresProvider({children}) {
  const { showAlert } = useContext(UIContext);
  const { allScores, setAllScores } = useState(null);

  

  function getImgScores(img_id) {
    fetch('/api/image-scores/img_id', {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: {
        image_id: img_id
      }
    })
    .then(async (res) => {
      const data = await res.json();
      if(res.ok) {
        setAllScores(data);
      } else {
        showAlert('getImgScores response not ok, data message:', data.message);
      }
    })
  }

  const value = {
    getImgScores,
    allScores
  }

  return( 
    <ScoresContext.Provider value={value}>
      {children}
    </ScoresContext.Provider>
  )
}

export {ScoresContext};

