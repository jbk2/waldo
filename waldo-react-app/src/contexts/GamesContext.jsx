import { useState, useEffect, useCallback, createContext, useContext } from "react";
import GameAPI from "../utils/gameAPI";
import { AuthContext } from "./AuthContext";

const GamesContext = createContext();

export default function GamesProvider({children}) {
  const [ games, setGames ] = useState([]);
  const [ userGames, setUserGames ] = useState([]);
  const { user, signedIn } = useContext(AuthContext);

  async function loadGames() {
    const response = await GameAPI.getGames();
    
    if(response.ok) {
      setGames(response.data.games)
      console.log('heres response.data.games form the GameContext useEffect loadGames call', response.data.games)
      return response.data.games;
    } else {
      console.error(response.data.message)
    }
  };
  
  const loadUserGames = useCallback(async () => {
    if(!user || !signedIn) return;
    
    const response = await GameAPI.getUserGames(user.id);
    
    if(response.ok) {
      setUserGames(response.data.games);
    } else {
      console.error(response.data.message);
    }
  }, [user, signedIn])
  
  const value = {
    games,
    loadGames,
    userGames,
    loadUserGames
  }
  
  useEffect(() => {
    loadGames();
  }, [user, signedIn]);
  
  useEffect(() => {
    if(signedIn && user) {
      loadUserGames();
    } else {
      setUserGames([]);
    }
  }, [user, signedIn, loadUserGames]);
  
  return(
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  )
}

export { GamesContext }