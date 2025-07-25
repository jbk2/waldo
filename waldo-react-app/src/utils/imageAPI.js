export default class ImageAPI {
  
  static async loadImages() {
    const response = await fetch('/api/images', {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    })
    if(!response.ok) { throw new Error('loadImages API call not ok')}
    return response.json();
  }
  
  static async loadImage(imgId) {
    const response = await fetch(`/api/images/${imgId}`, {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    })
    if(!response.ok) { throw new Error(`loadImage ${imgId} API call not ok`)}
    const imageAndCharacters  = await response.json().image;
    return imageAndCharacters;
  }

  static async getImageByTitle(imageTitle) {
    console.log('ImageAPI.getImageByTitle called with:', imageTitle);
    
    try {
      const response = await fetch(`/api/images/by_title/${imageTitle}`, {
        credentials: 'include',
        headers: {
          "Accept": "application/json"
        }
      })
      
      if(!response.ok) { 
        console.error('Response not ok:', response.status, response.statusText);
        throw new Error(`by_title ${imageTitle} API call not ok: ${response.status}`)
      }
      
      const data = await response.json();
      console.log('Raw API response:', data);
      
      return data;
    } catch (error) {
      console.error('Error in getImageByTitle:', error);
      throw error;
    }
  }
}