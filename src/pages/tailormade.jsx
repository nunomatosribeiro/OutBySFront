import '../Tailormade.css'
import DatePicker from '../components/DatePicker';
import WhatsAppButton from '../components/WhatsApp';
import FormTailormade from '../components/FormTailormade';
function TailorMade () {

    return ( 
     <div className='tailormade-container1'>
        <section className='section1-tailormade-page'>
  <div className='container-section1-tailormade-page-intro'>
    
    <img src='porto-activities.jpg' alt='' />
  <div className='text-section1-container'>
  <h1>Let us help you plan your trip  </h1>
<h5>Crafting unique experiences</h5>
<p>Porto is a city full of personality and creative people.<br/>
Get ready to fall in love and leave with the desire to return </p>
</div>
   
    </div>
</section>
<section className='section2-tailormade-page'>
   
<div className='container-section2-images'>


<div className='whatsapp-container'>
<img className='container-section2-images-img' src='background-photo2.jpg' alt='tailormade-image' style={{width:'450px', padding: '30px'}} />
<div className='whatsapp-text-container'>
<p>Talk with us through WhatsApp</p>
 <WhatsAppButton /> 
</div>
</div>
<div className='whatsapp-container'>

<img className='container-section2-images-img' src='tailormade-page-image-yellow.jpg' alt='tailormade-image' style={{width:'450px', minHeight: '325px', padding: '30px'}} />
<div className='tailormade-form-container'>

<p>Or Fill Our Form</p>
 <FormTailormade /> 
{/*  <DatePicker /> */}
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