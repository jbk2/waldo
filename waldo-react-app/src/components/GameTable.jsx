import { useState, useEffect } from "react"
export default function GameTable({games, imageArray, imageTitles}) {

  const [ selectedTabImgId, setSelectedTabImgId ] = useState(null)
  
  useEffect(() => {
    if(imageArray && imageArray.length > 0) {
      setSelectedTabImgId(imageArray[0].image_id)
    }
  }, [imageArray])
  
  const selectedGames = imageArray.find(img => img.image_id === selectedTabImgId)?.games;
  
  function handleTabClick(imageId) {
    setSelectedTabImgId(imageId)
  }

  if (!imageTitles || !games || !imageArray || !selectedGames) {
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
            <thead className="sticky top-0 bg-teal-50">
              <tr>
                <th>📈 Rank</th>
                <th>👤 Username</th>
                <th>⏱️ Time</th>
              </tr>
            </thead>
            <tbody>
              { 
                selectedGames.map((game, i) => {
                  return(
                    <tr className="font-mono font-light" key={game.id}>
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


