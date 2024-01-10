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

const MainPage = ({ isOpen, isLiked, openModal }) => {
 



return (
      <div className={isOpen ? "mainpage-container-blur" : 'mainpage-container'}>

<section id="section01">            
<div className="hero-Image">
      <img src="/section01Image.jpg" alt="mainpage-intro-image" />
<div className="hero-Text">
<h1>Welcome to OutByS</h1>
<p>Travel effortless, plan ahead or know now, we've got you covered!{/* Live the city as a local */}</p>
<p>Local experts, available 24/7!{/* We are here to take care of the logistics, while you can enjoy the city! */}</p>
<p>No payment upfront, worry free!</p>
</div>
</div>
<Tab />
</section>


     

  
 
<section className="section02" id='section02'>
<div className='tailormade-container2'>
<img className='porto-imageTailormade' src='porto-image.jpg'/>
<div className='text-container-tailormade-mainpage'>
<h1>Done for you ! </h1>
<h4>The ultimate travel companion at your fingertips</h4><WhatsAppButton className='whatsapp-icon' /> 

<p>Our most personalized service! One click away...</p>
<p>We are available 24 hours via WhatsApp and e-mail.
Looking forward to hear from you and welcome to Porto!</p>

<Link to={'/Tailormade'}><button>Discover more</button></Link>
</div>

</div>

</section>

<section className="transition-section">
      <div className="transition-section-container">
      <h3>Enjoy your time, focus on the adventure, leave the planning for us.{/* Take some time to enjoy yourself and let us plan your trip */}</h3>
      <br/>
      <p>Use Reserve Now & Pay Later / Free cancelation / Private Concierge <br/></p>
      </div>
</section>


<section className="section03" id='section03'>
<div className='food-container'>
  

<div className="textalign-foodSection">
<div className='text-container-food'>
<h1>Eat like a local!</h1>
<p>The rich gastronomy will make your mouth watering.<br/>
Traditional cuisine or author, you will be pleased with the gastronomic choices!</p>
<Link to={'/posts/Food'}><button>Discover more</button></Link>
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
<Link to={'/posts/Activities'}><button>Discover more</button></Link>
</div>
</div>
</section>

<section  id='section05'>
<div className='tours-container'>
 <div className='text-container-tours'>
<h1>Tours at your fingertips</h1>
<p><strong>Know now</strong> - Best crafted tours for you!</p>
<p>Whether you feel like learning more about Porto, 
going for a trip to the Douro Valley or to a nearby city
you can count on us for a remarkable experience!</p>
<Link to={'/posts/Tours'}><button>Discover more</button></Link>
</div>
<div className="grid-tours-mainpage" >
<GridMainPage isLiked={isLiked} openModal={openModal}  />
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