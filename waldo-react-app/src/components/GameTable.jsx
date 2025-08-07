import { useState, useEffect, useContext, useRef, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GamesContext } from "../contexts/GamesContext";
import { ResultsContext } from "../contexts/ResultsContext";

export default function GameTable() {
  const [ sortConfig, setSortConfig ] = useState({ key: null, direction: 'asc' });
  const { user } = useContext(AuthContext);
  const { DIFFICULTY_PROPS, images, games } = useContext(GamesContext);
  const { activeTabImageId, setActiveTabImageId, imagesAndTheirGames,
    activeTabGames, focussedGameId } = useContext(ResultsContext);
  const focussedRow = useRef();
  
  // sorts games order based upon clicked header column
  const sortedGames = useMemo(() => {
    if(!sortConfig.key) return activeTabGames;

    const sorted = [...activeTabGames].sort((a, b) => {
      let aValue, bValue;

      switch(sortConfig.key) {
        case 'time':
          aValue = a.time;
          bValue = b.time;
          break;
        case 'username': 
          aValue = a.username.toLowerCase();
          bValue = b.username.toLowerCase();
          break;
        default:
          return 0;
        }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [activeTabGames, sortConfig]);
 
  function handleTabClick(imageId) {
    setActiveTabImageId(imageId)
  };

  function handleSortClick(sortKey) {
    setSortConfig((prev) => ({
      key: sortKey,
      direction: prev.key === sortKey && prev.direction === 'asc' ? 'dsc' : 'asc'
    }));
  }

  function getRowClasses(isUsersGame, isFocussedRow) {
    const baseClasses = 'font-mono font-light';
    const usersGame = isUsersGame ? 'bg-[#FFFAF9] font-variation-settings-wght-600 underline decoration-indigo-400 underline-offset-3 decoration-wavy decoration-1' : '';
    const focussedRow = isFocussedRow ? 'animate-color-and-bounce' : '';
    
    return `${baseClasses} ${usersGame} ${focussedRow}`;
  };  

  const setFocussedRowRef = (element) => {
    focussedRow.current = element;
  };

  // default sets selectedTab to first image in imagesGames array
  useEffect(() => {
    if(imagesAndTheirGames && imagesAndTheirGames.length > 0) {
      setActiveTabImageId(imagesAndTheirGames[0].image_id)
    }
  }, [imagesAndTheirGames, setActiveTabImageId]);

  // scrolls last game into view
  useEffect(() => {
    if(focussedRow.current) {
      focussedRow.current.scrollIntoView({
        behaviour: 'smooth',
        block: 'center'
      })
    }
  }, [focussedGameId])


  if (!images || !games || !imagesAndTheirGames || !activeTabGames) {
    return <div>Loading</div>;
  }

  return(
    <>
      <div role="tablist" className="mx-auto tabs tabs-lift tabs-xs -mb-[1px]">
        { images.map((image) => {
          const isActive = activeTabImageId === image.image_id;
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
                    onClick={() => handleSortClick('time')}
                  >⇵</span>
                </th>
                <th id="username">👤 Username
                  <span
                    className="ml-1 text-[0.7rem] hover:cursor-pointer"
                    onClick={() => handleSortClick('username')}
                  >⇵</span>
                </th>
                <th id="time">⏱️ Time
                  <span
                    className="ml-1 text-[0.7rem] hover:cursor-pointer"
                    onClick={() => handleSortClick('time')}
                  >⇵</span>
                </th>
              </tr>
            </thead>
            <tbody>
              { 
                sortedGames.map((game) => {
                  const isUsersGame = game.user_id === user.id;
                  const isFocussedRow = game.id === focussedGameId;
                  return(
                    <tr
                      key={game.id}
                      className={getRowClasses(isUsersGame, isFocussedRow)}
                      ref={focussedGameId === game.id ? setFocussedRowRef : null}
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


