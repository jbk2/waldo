import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export default function GameTable({games, imageArray, imageTitles}) {
  const [ selectedTabImgId, setSelectedTabImgId ] = useState(null)
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    if(imageArray && imageArray.length > 0) {
      setSelectedTabImgId(imageArray[0].image_id)
    }
  }, [imageArray])
  
  const selectedTabsGames = imageArray.find(img => img.image_id === selectedTabImgId)?.games || [];
  const signedInUsersLastGame = games
    .filter((game) => game.user_id === user?.id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0] || null;

  
  function handleTabClick(imageId) {
    setSelectedTabImgId(imageId)
  }

  if (!imageTitles || !games || !imageArray || !selectedTabsGames) {
    return <div>Loading</div>;
  }

  return(
    <>
      <div role="tablist" className="pl-4 tabs tabs-lift tabs-xs -mb-[1px]">
        { imageTitles.map((image) => {
          const isActive = selectedTabImgId === image.image_id;
          return(
            <a
              role="tab"
              className={`tab ${isActive ? 'tab-active [--tab-border-color:#e5e7eb]' : ''} `}
              key={image.image_id}
              onClick={() => handleTabClick(image.image_id)}
            >
              {image.title}
            </a>
          )
          })
        }
      </div>
      <div className="max-w-140 min-w-100 rounded-box border border-gray-200 bg-base-100 overflow-y-auto">
        <div className="max-h-50 overflow-y-auto">
          <table className="table table-xs border-t-0">
            <thead className="sticky top-0 bg-sky-50">
              <tr>
                <th>📈 Rank</th>
                <th>👤 Username</th>
                <th>⏱️ Time</th>
              </tr>
            </thead>
            <tbody>
              { 
                selectedTabsGames.map((game, i) => {
                  const signedInUsersGame = game.user_id === user.id;
                  const latestGame = game.id === signedInUsersLastGame.id;
                  return(
                    <tr
                      key={game.id}
                      className={`font-mono font-light 
                      
                        ${signedInUsersGame ? 'bg-[#FFFAF9] font-variation-settings-wght-600 \
                          underline decoration-indigo-400 underline-offset-3 decoration-wavy decoration-1'
                        : ''} 
                        
                        ${latestGame ? 'animate-bounce text-red-500' : ''}
                      `}>
                      <th>{i+1}</th>
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
}


