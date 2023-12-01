import '../Tailormade.css'
import WhatsAppButton from '../components/WhatsApp';
function TailorMade () {

    return ( 
     <div className='tailormade-container1'>
       {/*  <section className='section1-tailormade-page'>
<img src='tailormade-page-image-nature.jpg' alt='tailormade-image' style={{width:'450px', padding: '30px'}} />
<img src='tailormade-page-image-yellow.jpg' alt='tailormade-image' style={{width:'450px', minHeight: '325px', padding: '30px'}} />
        </section> */}

        <section className='section1-tailormade-page'>

{/* <h5>Where Every Detail Reflects Your Unique Journey</h5>
 <h5>Where Every Experience is Crafted Just for You. Elevate Your Travel</h5>
  */}
  <div className='container-section1-tailormade-page-intro'>
    
    <img src='porto-activities.jpg' alt='' />
  <div className='text-section1-container'>
  <h1>Let us help you plan your trip  </h1>
<h5>Crafting unique experiences</h5>
<p>Vibrant and with personality</p>
</div>
   
    </div>
</section>
<section className='section2-tailormade-page'>
   
<div className='container-section2-images'>


<div className='whatsapp-container'>
<img className='container-section2-images-img' src='tailormade-page-image-nature.jpg' alt='tailormade-image' style={{width:'450px', padding: '30px'}} />
<div className='whatsapp-text-container'>
<p>Talk with us through WhatsApp</p>
<WhatsAppButton />
</div>
</div>
<div className='whatsapp-container'>

<img className='container-section2-images-img' src='tailormade-page-image-yellow.jpg' alt='tailormade-image' style={{width:'450px', minHeight: '325px', padding: '30px'}} />
<div className='whatsapp-text-container'>

<p>Or Talk with our ChatBot</p>
<WhatsAppButton />
</div>
</div>
</div>
</section>
{/* <section className='section3-tailormade-page'>
    
</section> */}
     </div>
       
     );
}

export default TailorMade;