import { Link } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import '../Mainpage.css'
import Tab from "../components/Tab";
import ActivitiesCarousel from "../components/Carousel";
import FoodCarousel from "../components/Food-carousel";
 import GridMainPage from "../components/GridTours";
import GridFood from "../components/GridFood"; 
import FormTailormade from "../components/FormTailormade";
import WhatsAppButton from "../components/WhatsApp";

const MainPage = ({ isOpen }) => {
 



return (
      <div className={isOpen ? "mainpage-container-blur" : 'mainpage-container'}>

<section id="section01">            
<div className="hero-Image">
      <img src="/section01Image.jpg" alt="mainpage-intro-image" />
<div className="hero-Text">
<h1>Welcome to OutByS</h1>
<p>Live the city as a local</p>
<p>We are here to take care of the logistics, while you can enjoy the city!</p>
</div>
</div>
<Tab />
</section>

  
 
<section className="section02" id='section02'>
<div className='tailormade-container2'>
<img className='porto-imageTailormade' src='porto-image.jpg'/>
<div className='text-container-tailormade-mainpage'>
<h1>Done for you ! </h1>
<p>First time visitor or a Portugal lover?
With focus in Porto and nearby cities such as Douro Valley and the north of Portugal, we are pleased
to help you with unique experiences, exceed your expectations, with
personal care anywhere and at any time !!
Let us in charge of your journey in Porto and have a magical experience.</p>
<p>We are available 24 hours via WhatsApp and e-mail.
Looking forward to hear from you and welcome to Porto!</p>

<Link to={'/posts/Tailormade'}><button>Learn more</button></Link>
<WhatsAppButton className='whatsapp-icon' />
</div>

</div>

</section>

<section className="transition-section">
      <div className="transition-section-container">
      <h3>Take some time to enjoy yourself and let us plan your trip</h3>
      <br/>
      <p>Free cancelation / Use Reserve Now & Pay Later / Private Concierge <br/></p>
      </div>
</section>


<section className="section03" id='section03'>
<div className='food-container'>
  

<div className="textalign-foodSection">
<div className='text-container-food'>
<h1>Eat like a local!</h1>
<p>The rich gastronomy will make your mouth watering.<br/>
Traditional cuisine or author, you will be pleased with the gastronomic choices!</p>
<Link to={'/posts/Food'}><button>Learn more</button></Link>
</div>
</div>
<div className="foodCarousel-container">
  <GridFood /> 
 </div>
</div>
</section>

<section className="section04" id='section04'>
<div className='activities-container'>
<div className="carousel-container">
<ActivitiesCarousel />
</div>
<div className='text-container-activities'>
<h1>Explore hidden gems & popular attractions</h1>
<p>Wether it is staying in the city watching the stunning sunset or<br />
going for a boat ride along the river,<br />
we`ve got something to make you feel happy!<br/>
</p>
<Link to={'/posts/Activities'}><button>Learn more</button></Link>
</div>
</div>
</section>

<section  id='section05'>
<div className='tours-container'>
 <div className='text-container-tours'>
<h1>Unforgettable sights, stunning nature and striking monuments</h1>
<p>Whether you feel like learning more about Porto, 
going for a trip to the Douro Valley or to a nearby city<br/>
you can count on us for a remarkable experience! </p>
<Link to={'/posts/Tours'}><button>Learn more</button></Link>
</div>
<div className="grid-tours-mainpage" >
<GridMainPage />
</div>
  

</div>
</section>
<section className="section-TailormadeForm">
      <div className="tailormade-form-container">
<h1>What it would be a remarkable journey for you?</h1>
<FormTailormade />
</div>
</section>
</div>
)
};
export default MainPage;