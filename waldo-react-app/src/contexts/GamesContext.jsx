import { useState, useEffect, useCallback, createContext, useContext } from "react";
import GameAPI from "../utils/gameAPI";
import { AuthContext } from "./AuthContext";
import ImageAPI from "../utils/imageAPI";

const GamesContext = createContext();

export default function GamesProvider({children}) {
  const [ imageTitles, setImageTitles ] = useState([]);
  const [ games, setGames ] = useState([]);
  const [ userGames, setUserGames ] = useState([]);
  const { user, signedIn } = useContext(AuthContext);

  async function loadGames() {
    console.log('=== LOADGAMES CALLED ===');
    const response = await GameAPI.getGames();
    
    if(response.ok) {
      setGames(response.data.games)
      return response.data.games;
    } else {
      console.error('=== LOADGAMES FAILED ===');
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
  }, [user, signedIn]);
  
  async function loadImages() {
    const imagesData = await ImageAPI.loadImages();
    const images = imagesData.images;
    const imgAndTitles = images.map((img) => {
      return { image_id: img.id, title: img.title }
    })
    setImageTitles(imgAndTitles)
  }

  const value = {
    games,
    loadGames,
    userGames,
    loadUserGames,
    imageTitles
  };
  
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

  useEffect(() => {
    loadImages();
  }, [])
  
  return(
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  )
}

export { GamesContext }