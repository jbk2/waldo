import { createContext, useContext, useState, useEffect } from "react"
import { UIContext } from "./UIContext";
import { AuthContext } from "./AuthContext";
import GameAPI from "../utils/gameAPI";

const ScoresContext = createContext();

export default function ScoresProvider({children}) {
  // const { signedIn } = useContext(AuthContext);
  // const [ games, setGames ] = useState(null);

  // useEffect(() => {
  //   async function loadUsersGames() {
  //     if(signedIn) {
  //       const response = await GameAPI.getCurrentUsersGames();
  //       if(response.ok) {
  //         setGames(response.data.games);
  //       } else {
  //         console.error(response.data.message)
  //       }
  //     }
  //   }
    
  //   loadUsersGames()
  // }, [signedIn])

  // function getImgScores(img_id) {
  //   fetch('/api/image-scores/img_id', {
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: {
  //       image_id: img_id
  //     }
  //   })
  //   .then(async (res) => {
  //     const data = await res.json();
  //     if(res.ok) {
  //       setAllScores(data);
  //     } else {
  //       showAlert('getImgScores response not ok, data message:', data.message);
  //     }
  //   })
  // }

  const value = {
    // games
  }

  return( 
    <ScoresContext.Provider value={value}>
      {children}
    </ScoresContext.Provider>
  )
}

export {ScoresContext};

