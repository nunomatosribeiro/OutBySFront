import axios from 'axios';
import React,  { useContext, useState } from 'react'
import { apiBaseUrl } from '../config';
import { useNavigate } from 'react-router-dom';

export default function FormTailormade() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const nav = useNavigate()

    const handleChange = (e) => {
     const {name, value} = e.target
     setFormData({...formData, [name]: value})
    }

    const handleSubmit = async () => {

try{
 const res = await axios.post(`${apiBaseUrl}/forms/submit-form`,
 formData, {
  headers: {
    'Content-Type': 'application/json',
  },
  
}
);
await axios.post(`${apiBaseUrl}/forms/send-email`, formData);
console.log("here is the TAILORMADE FORM response", res.data)

nav("/");
} catch (error) {
console.error(error);
}
};
  return (
    <div className='formTailormade-container'>
       <form className='formTailormade-container-form' onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
     
      <label>
        Message:
        <textarea placeholder='Tells us here. ' name="message" value={formData.message} onChange={handleChange} />
      </label>{ /* what you believe it would be a remarkable journey. */}
     
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}
