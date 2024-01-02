import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '+351915123464'; // Replace with your phone number

  const openWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <div>
       
      <button style={{border:'none', backgroundColor: 'transparent'}} onClick={openWhatsApp}>
   
       <p className='whatsapp-icon'><FaWhatsapp /> Chat on WhatsApp</p>
       
      </button>
      
    </div>
  );
};

export default WhatsAppButton;