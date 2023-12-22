import axios from 'axios';
import React,  { useContext, useState } from 'react'
import { apiBaseUrl } from '../config';
import { useNavigate } from 'react-router-dom';

export default function FormTailormade() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    tours: false,
    activities: false,
    food: false,
    other: false,
  });
  const [checked, setChecked] = useState(false);

  const handleChangeCheckBox = (e) => {
    const { name, checked } = e.target;
   
    setFormData({ ...formData, [name]: checked });
  };
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
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      
        What are you looking to enjoy in Porto?
      
  <div style={{display: 'flex', alignItems: 'center'}}>
        <input type="checkbox" name="tours"  checked={formData.tours} onChange={handleChangeCheckBox} />
         Tours
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <input type="checkbox" name="activities"  checked={formData.activities} onChange={handleChangeCheckBox} />
        Activities
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <input type="checkbox" name="food"  checked={formData.food} onChange={handleChangeCheckBox} />
        Food
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <input type="checkbox" name="other"  checked={formData.other} onChange={handleChangeCheckBox} />
        Other
        </div>
      <label>
        Message:
        <textarea placeholder='Tell us here. ' name="message" value={formData.message} onChange={handleChange} />
      </label>{ /* what you believe it would be a remarkable journey. */}
     
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}
