import axios from 'axios';
import React,  { useEffect, useState } from 'react'
import { apiBaseUrl } from '../config';
import { useNavigate, useParams } from 'react-router-dom';
import '../PageDetails.css'
export default function ReserveNow() {
    const { userId, postId } = useParams()
    console.log('Params:', { userId, postId })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
})
const nav = useNavigate();

    useEffect(() =>{ 
      fetchData();
          }, [userId, postId]);

        const fetchData = async () =>{
            try {
               /*  const userResponse = await axios.get(`${apiBaseUrl}/users/${userId}`)
                const userData = userResponse.data; */

                const productResponse = await axios.get(`${apiBaseUrl}/posts/details/${postId}`)
                const productData = productResponse.data

               /*  console.log('userData:', userData); */
                console.log('productData:', productData);

                setFormData((prevFormData) => ({
                  ...prevFormData,
                  product: productData.title,
                }));
                console.log('Ver aqui INFO QUE VAI SER RECEBIDA POR EMAIL', formData)
            } catch (error) {
                console.error('Error fetching dynamic information:', error);
              }
            };
        
            const handleChange = (e) => {
              const {name, value} = e.target
              setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
              }));
            };


          const handleButtonClick = async () => {
            
            try {
            
              // Send the dynamically obtained data to the server
              const response = await axios.post(`${apiBaseUrl}/forms/send-email`, formData);
              console.log(response.data);
              const res = await axios.post(`${apiBaseUrl}/forms/submit-form`,
 formData, {
  headers: {
    'Content-Type': 'application/json',
  },
}
);
await axios.post(`${apiBaseUrl}/forms/send-email`, formData);
nav(`/posts/details/${postId}`);
            } catch (error) {
              console.error('Error sending email:', error);
            }
          };

      return (
        <div className='magic-form'>
          <div className='magic-form2'>
              <form onSubmit={handleButtonClick}>
      
        <input placeholder='Name' type="text" name="name" value={formData.name} onChange={handleChange} />
      
      <br />
      
        <input placeholder='Email' type="email" name="email" value={formData.email} onChange={handleChange} />
      
      <br />
</form></div>
        <button onClick={handleButtonClick}>
          Make it happen!
         {/* Make the magic happen button */}
         {/* Magic reservation button */}
        </button>
        </div>
      );
    }

 