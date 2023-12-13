import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import '../PageDetails.css'


export default function PageDetailsImages({ posts }) {
  
const images =Array.isArray(posts.allMedia)
? posts.allMedia.map((media, index)=> ({
    original: `https://res.cloudinary.com/du6zxcbrm/image/upload/${String(media).replace('image/', '')}`,
  thumbnail: `https://res.cloudinary.com/du6zxcbrm/image/upload/${String(media).replace('image/', '')}`,
  description: `Image ${index + 1}`,
})) : [];



  return (
    <div >
    
        {images.length > 0 ? (
          <ImageGallery items={images} />
        ) : (
          <p>No images available</p>
        )}
      
      
    
   
   
    </div>
    )
        }
