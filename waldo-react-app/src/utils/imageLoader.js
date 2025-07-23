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
    const imageAndCharacters  = response.json().image;
    return imageAndCharacters;
  }

  static async getImageByTitle(imageTitle) {
    const response = await fetch(`/api/images/by_title/${imageTitle}`, {
      credentials: 'include',
      headers: {
        "Accept": "application/json"
      }
    })
    if(!response.ok) { throw new Error(`by_title ${imageTitle} API call not ok`)}
    const data = await response.json();
    return data.image;
  }

}

export default ImageLoader;