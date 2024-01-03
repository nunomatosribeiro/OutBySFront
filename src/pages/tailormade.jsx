import '../Tailormade.css'
import DatePicker from '../components/DatePicker';
import WhatsAppButton from '../components/WhatsApp';
import FormTailormade from '../components/FormTailormade';
function TailorMade ({isOpen}) {

    return ( 
     <div className={isOpen ? "mainpage-container-blur" :'tailormade-container1'}>
        <section className='section1-tailormade-page'>
  <div className='container-section1-tailormade-page-intro'>
    
    <img src='porto-activities.jpg' alt='' />
  <div className='text-section1-container'>
<h4>Crafting unique experiences for free</h4>
<h6>Enjoy your time, do not worry!</h6>
<h6>Plan ahead and simple! <br/>
We take care of everything!</h6>
<p>
First time visitor or a Portugal lover? With focus in Porto 
and nearby cities such as 
Douro Valley and 
the north of Portugal, we are pleased to help you with unique 
experiences, exceed your expectations, with personal care 
anywhere and at any time !!
</p>
</div>
</div>
</section>

<section className='section2-tailormade-page'>   
<div className='container-section2-images'>
<div className='whatsapp-container'>
<div className='whatsapp-text-container'>
<p>Talk with us via WhatsApp</p>
 <WhatsAppButton /> 
</div>
</div>
<div className='whatsapp-container'>

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