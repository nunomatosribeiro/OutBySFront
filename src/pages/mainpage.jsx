import { Link } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import '../Mainpage.css'
import Tab from "../components/Tab";
import ActivitiesCarousel from "../components/Carousel";
import FoodCarousel from "../components/Food-carousel";
 import GridMainPage from "../components/GridTours";
import GridFood from "../components/GridFood"; 
 
const MainPage = () => {
 



return (
      <div>


<section id="section01">            
<div className="hero-Image">
<div className="hero-Text">
<h1>Welcome to OutByS</h1>
<h4>Live the city as a local</h4>
<h4>Crafting Unforgettable Journeys</h4>
</div>
</div>
<div>
<Tab />
</div>
</section>

  
 
<section className="section02" id='section02'>
<div className='tailormade-container2'>
<img className='porto-imageTailormade' src='porto-image.jpg'/>
<div className='text-container-tailormade-mainpage'>
<h1>Tailor Made Experiences</h1>
<p>Text us and we will help you plan your trip.<br/>
If its your first time in Porto do not worry<br/>
we will plan everything for you. Just tell us what you like! </p>
<Link to={'/Tailormade'}><button>Learn more</button></Link>
</div>
</div>
</section>

<section className="transition-section">
      <div className="transition-section-container">
      <h3>Take some time for yourself and let us plan your trip</h3>
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
<Link to={'/Food'}><button>Learn more</button></Link>
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
<Link to={'/Activities'}><button>Learn more</button></Link>
</div>
</div>
</section>

<section className="section05" id='section05'>
<div className='tours-container'>
 <div >
       <GridMainPage />
</div>
  
<div className='text-container-tours'>
<h1>Unforgettable sights, stunning nature and striking monuments</h1>
<p>Whether you feel like learning more about Porto, <br/>
going for a trip to the Douro Valley or to a nearby city<br/>
you can count on us for a remarkable experience! </p>
<Link to={'/Tours'}><button>Learn more</button></Link>
</div>
</div>
</section>
</div>
)
};
export default MainPage;