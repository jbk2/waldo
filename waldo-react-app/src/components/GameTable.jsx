import { useState, useEffect, useContext, useRef, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GamesContext } from "../contexts/GamesContext";

export default function GameTable({games, imagesGames, images}) {
  const [ selectedTabImgId, setSelectedTabImgId ] = useState(null)
  const [ sortConfig, setSortConfig ] = useState({ key: null, direction: 'asc' });
  const { user } = useContext(AuthContext);
  const { DIFFICULTY_PROPS } = useContext(GamesContext);
  const lastGameRow = useRef();
  const selectedTabGames = useMemo(() =>
    imagesGames.find(img => img.image_id === selectedTabImgId)?.games || [],
    [imagesGames, selectedTabImgId]
  );
  // returns users last played game 
  const usersLastGame = useMemo(() =>
    games
      .filter((game) => game.user_id === user?.id)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0] || null,
    [games, user?.id]
  );
  
  // sorts games order based upon clicked header column
  const sortedGames = useMemo(() => {
    if(!sortConfig.key) return selectedTabGames;

    const sorted = [...selectedTabGames].sort((a, b) => {
      let aValue, bValue;

      switch(sortConfig.key) {
        case 'rank':
          aValue = a.time;
          bValue = b.time;
          break;
        case 'username': 
          aValue = a.username.toLowerCase();
          bValue = b.username.toLowerCase();
          break;
        case 'time':
          aValue = a.time;
          bValue = b.time;
          break;
        default:
          return 0;
        }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [selectedTabGames, sortConfig]);

  // default sets selectedTab to first image in imagesGames array
  useEffect(() => {
    if(imagesGames && imagesGames.length > 0) {
      setSelectedTabImgId(imagesGames[0].image_id)
    }
  }, [imagesGames]);

  // scrolls last game into view
  useEffect(() => {
    if(lastGameRow.current) {
      lastGameRow.current.scrollIntoView({
        behaviour: 'smooth',
        block: 'center'
      })
    }
  }, [selectedTabGames, usersLastGame])

  function handleTabClick(imageId) {
    setSelectedTabImgId(imageId)
  };

  function handleSortClick(e) {
    const sortKey = e.target.parentNode.id;
    setSortConfig((prev) => ({
      key: sortKey,
      direction: prev.key === sortKey && prev.direction === 'asc' ? 'dsc' : 'asc'
    }));
  }
// sets styling for; all games, users games, and users last played game
  function getRowClasses(isUsersGame, isUsersLastGame) {
    const baseClasses = 'font-mono font-light';
    const usersGame = isUsersGame ? 'bg-[#FFFAF9] font-variation-settings-wght-600 underline decoration-indigo-400 underline-offset-3 decoration-wavy decoration-1' : '';
    const usersLastGame = isUsersLastGame ? 'text-red-500 animate-pulse' : '';
    
    return `${baseClasses} ${usersGame} ${usersLastGame}`;
  };  

  // sets lastGameRow ref
  const setRef = (element) => {
    lastGameRow.current = element;
  };

  if (!images || !games || !imagesGames || !selectedTabGames) {
    return <div>Loading</div>;
  }

  return(
    <>
      <div role="tablist" className="pl-4 tabs tabs-lift tabs-xs -mb-[1px]">
        { images.map((image) => {
          const isActive = selectedTabImgId === image.image_id;
          return(
            <a
              role="tab"
              className={`tab ${isActive ? 'tab-active [--tab-border-color:#e5e7eb]' : ''} `}
              key={image.image_id}
              onClick={() => handleTabClick(image.image_id)}
            >
              {image.title} - {DIFFICULTY_PROPS[image.difficulty].text_abbreviation}
            </a>
          )
          })
        }
      </div>
      <div className="max-w-140 min-w-100 rounded-box border border-gray-200 bg-base-100 overflow-y-auto">
        <div className="max-h-100 overflow-y-auto">
          <table className="table table-xs border-t-0">
            <thead className="sticky top-0 bg-sky-50">
              <tr>
                <th id="rank">📈 Rank
                  <span
                    className="ml-1 text-[0.7rem] hover:cursor-pointer"
                    onClick={handleSortClick}
                  >⇵</span>
                </th>
                <th id="username">👤 Username
                  <span
                    className="ml-1 text-[0.7rem] hover:cursor-pointer"
                    onClick={handleSortClick}
                  >⇵</span>
                </th>
                <th id="time">⏱️ Time
                  <span
                    className="ml-1 text-[0.7rem] hover:cursor-pointer"
                    onClick={handleSortClick}
                  >⇵</span>
                </th>
              </tr>
            </thead>
            <tbody>
              { 
                sortedGames.map((game) => {
                  const isUsersGame = game.user_id === user.id;
                  const isUsersLastGame = usersLastGame && game.id === usersLastGame.id;
                  return(
                    <tr
                      key={game.id}
                      className={getRowClasses(isUsersGame, isUsersLastGame)}
                      ref={isUsersLastGame ? setRef : null}
                      >
                      <th>{game.rank}</th>
                      <td>{game.username}</td>
                      <td>{(game.time / 1000).toFixed(2)}s</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
};


