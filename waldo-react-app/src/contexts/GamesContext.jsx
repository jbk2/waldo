import { useState, useEffect, useCallback, createContext, useContext } from "react";
import GameAPI from "../utils/gameAPI";
import { AuthContext } from "./AuthContext";
import ImageAPI from "../utils/imageAPI";

const GamesContext = createContext();

export default function GamesProvider({children}) {
  const [ imageIdsAndTitles, setImageIdsAndTitles ] = useState([]);
  const [ games, setGames ] = useState([]);
  const [ userGames, setUserGames ] = useState([]);
  const { user, signedIn } = useContext(AuthContext);

  const loadGames = useCallback(async () => {
    console.log('=== LOADGAMES CALLED ===');
    const response = await GameAPI.getGames();
    
    if(response.ok) {
      setGames(response.data.games)
      return response.data.games;
    } else {
      console.error('=== LOADGAMES FAILED ===');
      console.error(response.data.message)
    }
  }, []);
  
  const loadUserGames = useCallback(async () => {
    if(!user || !signedIn) return;
    
    const response = await GameAPI.getUserGames(user.id);
    
    if(response.ok) {
      setUserGames(response.data.games);
    } else {
      console.error(response.data.message);
    }
  }, [user, signedIn]);

   const loadImages = useCallback(async () => {
    const imagesData = await ImageAPI.loadImages();
    const images = imagesData.images;
    const imgIdsAndTitles = images.map((img) => {
      return { image_id: img.id, title: img.title }
    })
    setImageIdsAndTitles(imgIdsAndTitles)
  }, []);
  
  useEffect(() => {
    if(signedIn && user) {
      loadGames();
    }
  }, [user, signedIn, loadGames]);
  
  useEffect(() => {
    if(signedIn && user) {
      loadUserGames();
    } else {
      setUserGames([]);
    }
  }, [user, signedIn, loadUserGames]);
  
  useEffect(() => {
    loadImages();
  }, [loadImages])
  
  const value = {
    games,
    loadGames,
    userGames,
    loadUserGames,
    imageIdsAndTitles
  };

  return(
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  )
}

export { GamesContext }