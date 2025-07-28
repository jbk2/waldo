
export default class GameAPI {

  static async saveGame(imageId, gameTime) {
    try {
      const response = await fetch('/api/games', {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          game: {
            image_id: imageId,
            time: gameTime
          }
        })
      })
      const data = await response.json();
      return { ok: response.ok, data: data }
    } catch(err) {
      return { ok: false, data: {
        message: err.message || "Save game failed, fetch threw an error, \
        and there was no err.message object"
        } 
      }
    }
  };
  
  static async getUserGames(userId) {
    try {
      const response = await fetch(`api/user/${userId}/games`, {
        headers: {
          "Accept": "application/json"
        }
      })
      const data = await response.json();
      console.log(`from gameAPI heres user ${userId}'s games and images `, data);
      return { ok: response.ok, data: data }
    } catch(err) {
      return { ok: false, data: {
        message: err.message || "get user games failed, the fetch threw an error, \
        and there was no err.message object"
      }
    }
  }
};

static async getGames() {
  try {
    const response = await fetch('api/games', {
      headers: {
        "Accept": "application/json"
      }
    })
    const data = await response.json();
    console.log('from gameAPI heres games and images ', data);
    return { ok: response.ok, data: data }
  } catch(err) {
      return { ok: false, data: {
        message: err.message || "get games failed, the fetch threw an error, \
        and there was no err.message object"
      }
    }
  }
}

  // saveGame
  // loadGamesByUser(user_id)
  // loadGamesByImage(image_id)
}