import { useState, useEffect, useCallback, createContext, useContext, useMemo } from "react";
import GameAPI from "../utils/gameAPI";
import { AuthContext } from "./AuthContext";
import ImageAPI from "../utils/imageAPI";

const GamesContext = createContext();

export default function GamesProvider({children}) {
  const [ images, setImages ] = useState([]);
  const [ games, setGames ] = useState([]);
  const [ userGames, setUserGames ] = useState([]);
  const { user, signedIn } = useContext(AuthContext);
  const DIFFICULTY_PROPS = useMemo(() => ({
    easy: { bg_color: 'bg-green-400', text_abbreviation: 'easy'},
    medium: { bg_color: 'bg-blue-400', text_abbreviation: 'med'},
    difficult: { bg_color: 'bg-orange-400', text_abbreviation: 'diff'},
    very_difficult: { bg_color: 'bg-red-400', text_abbreviation: 'v.diff'}
  }), []);

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
    console.log('LOAD IMAGES CALLED >>> IMAGES>>', images);
    const imgs = images.map((img) => {
      return { image_id: img.id, title: img.title, difficulty: img.difficulty }
    })
    setImages(imgs)
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
  
  const value = useMemo(() => ({
    games,
    loadGames,
    userGames,
    loadUserGames,
    images,
    DIFFICULTY_PROPS
  }), [games,
    loadGames,
    userGames,
    loadUserGames,
    images,
    DIFFICULTY_PROPS]);

  return(
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  )
}

export { GamesContext }