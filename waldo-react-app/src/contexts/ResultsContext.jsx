import { useState, createContext, useContext, useMemo } from "react"
import { GamesContext } from "./GamesContext"
import { AuthContext } from "./AuthContext";

const ResultsContext = createContext()

export default function ResultsProvider({children}) {
  const { user } = useContext(AuthContext);
  const { games } = useContext(GamesContext);
  const [ activeTabImageId, setActiveTabImageId ] = useState(null)

  const imagesAndTheirGames = useMemo(() => {
    const result = games.reduce((acc, game) => {
      const imageId = game.image_id;
      const existingImageEl = acc.find(img => img.image_id === imageId);
  
      if(existingImageEl) {
        existingImageEl.games.push(game);
        existingImageEl.games.sort((a, b) => a.time - b.time);
      } else {
        acc.push({
          image_id: imageId,
          games: [game]
        });
      }
      return acc
    }, [])

    result.forEach((image) => {
      image.games.forEach((game, index) => {
        game.rank = index + 1;
      });
    });

    return result;
  }, [games])

  const activeTabGames = useMemo(() =>
    imagesAndTheirGames.find(img => img.image_id === activeTabImageId)?.games || [],
    [imagesAndTheirGames, activeTabImageId]
  );

 const usersLastGame = useMemo(() =>
    games
      .filter((game) => game.user_id === user?.id)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0] || null,
    [games, user?.id]
  );

  const value = {
    activeTabImageId,
    setActiveTabImageId,
    imagesAndTheirGames,
    activeTabGames,
    usersLastGame
  }
  
  return(
    <ResultsContext.Provider value={value}>
      {children}
    </ResultsContext.Provider>
  )
};

export { ResultsContext };