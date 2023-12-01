
import Carousel from 'react-bootstrap/Carousel';
import '../Carousel.css'

function ActivitiesCarousel() {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="activities-image1"
            src="/porto-image.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="activities-image2"
            src="/dragao-stadium.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="activities-image3"
            src="/porto-activities.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    );
  }
  
  export default ActivitiesCarousel;