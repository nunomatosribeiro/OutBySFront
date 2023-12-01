import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';

const FoodCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 768 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 767, min: 464 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    return (
      <Carousel responsive={responsive}  autoPlay={false}
      swipeable="true" activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <a href="/login">
          <img className='imageSlide-foodSection' src='/porto-francesinhaImage.jpg' alt="First slide" />
          </a>{/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
          <a href="/signup">
          <img className='imageSlide-foodSection' src='/porto-cheeseboardImage.jpg' />
          </a><img className='imageSlide-foodSection' src='/porto-sardinhasImage.jpg' />
          
        </Carousel.Item>
        {/*  <Carousel.Item>
         <img className='imageSlide-foodSection' src='/porto-francesinhaImage.jpg' alt="First slide" />
          <img className='imageSlide-foodSection' src='/porto-cheeseboardImage.jpg' />
          <img className='imageSlide-foodSection' src='/porto-sardinhasImage.jpg' />
        </Carousel.Item> */}
        {/*<Carousel.Item>
          
        </Carousel.Item> */}
      </Carousel>
      
     );
}
 
export default FoodCarousel;