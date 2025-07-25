
export default class GameAPI {

  static async saveGame(imageId, gameTime) {
    return fetch('/api/games', {
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
    .then(async (res) => {
      const data = await res.json();
      return { ok: res.ok, data }
    })
    .catch((err) => {
      return { ok: false, data:
        { message: err.message || "Save game failed, fetch threw an error, and there was no err.message object"}
      }
    })
  }
  
  // saveGame
  // loadGamesByUser(user_id)
  // loadGamesByImage(image_id)
}