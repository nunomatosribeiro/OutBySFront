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

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

  return (
    <div className='page-details-container'>
    
 
<div className='container2'>
    <section className='section1-gallery-page-details'>
    
        {images.length > 0 ? (
          <ImageGallery items={images} />
        ) : (
          <p>No images available</p>
        )}
      
      
    </section>
    </div>
   
    </div>
    )
        }
