class ImageLoader {
  
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
    console.log('ImageLoader.getImageByTitle called with:', imageTitle);
    
    try {
      const response = await fetch(`/api/images/by_title/${imageTitle}`, {
        credentials: 'include',
        headers: {
          "Accept": "application/json"
        }
      })
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if(!response.ok) { 
        console.error('Response not ok:', response.status, response.statusText);
        throw new Error(`by_title ${imageTitle} API call not ok: ${response.status}`)
      }
      
      const data = await response.json();
      console.log('Raw API response:', data);
      console.log('data.image:', data.image);
      
      return data.image;
    } catch (error) {
      console.error('Error in getImageByTitle:', error);
      throw error;
    }
  }

}

export default ImageLoader;