import { createContext, useState, useEffect } from "react";
import ImageLoader from "../utils/imageLoader";

const ImagesContext = createContext();

export default function ImagesProvider({children}) {
  const [ images, setImages ] = useState(null);

  // function convertImgDataFromRailsToReact(images) {
  //   images.map((image) => ({
  //     imageId: image.id,
  //     imageTitle: image.title,
  //     imageURL: image.image.url,
  //     characters: image.characters.map((char) => ({
  //       characterName: char.name,
  //       characterClicked: char.clicked,
  //       characterStartX: char.start_x,
  //       characterEndX: char.end_x,
  //       characterStartY: char.start_y,
  //       characterEndY: char.end_y
  //     }))
  //   }));
  // }
  
  useEffect(() => {
    const loadImages = async () => {
      const data = await ImageLoader.loadImages();
      console.log("from images context here's load images data >>", data);
      const images = data.images;

      setImages(data.images);
    }
    loadImages();
  }, []);

  if(!images) {
    return null;
  }

  const value = {
    images
  };

  return(
    <ImagesContext.Provider value={value} >
      {children}
    </ImagesContext.Provider>
  )
}

export {ImagesContext}

