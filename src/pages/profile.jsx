import React, { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth.context'
import axios from 'axios';
import { apiBaseUrl } from '../config';
import CloudinaryUpload from '../components/CloudinaryUpload'

export default function Profile() {
    const [profileImage, setProfileImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [ profileUpdate, setProfileUpdate] = useState('')
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

    const handleImageChange = (event)=>{
        const file = event.target.files[0];
    setProfileImage(file);
    }
    const handleChange = (e) => {
        const {name, value} = e.target
        setProfileUpdate({...profileUpdate, [name]: value})
       }
    const submitProfileImage = async () => {
        if (!profileImage) {
          console.error('No profile image selected');
          return;
        }
   
        
        try {
            const formData = new FormData();
            formData.append('file', profileImage);
            formData.append('upload_preset', 'zg8ivfm6');
      
            const cloudinaryResponse = await axios.post(
              'https://api.cloudinary.com/v1_1/du6zxcbrm/upload',
              formData
            );
      
            const cloudinaryImageUrl = cloudinaryResponse.data.secure_url;
           
            // Create a new user data object with updated fields
    const updatedUserData = {
        name: 'New Name', // Replace with the updated name
        email: 'newemail@example.com', // Replace with the updated email
        profileImage: cloudinaryImageUrl,
        // ... other fields you want to update
      };

            // Associate the Cloudinary image URL with the user
            const userDataWithImage = {
              ...user, // Assuming user is an object with other user data
              updatedUserData,
            };
            console.log('response here PROFILE<---------', userDataWithImage)
            // Update user data on your server
            await axios.put(`${apiBaseUrl}/users/${user._id}`, userDataWithImage);
          
     window.location.reload();

        } catch (error) {
          console.error(error);
        }
      };
      
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', width: '100vw', height: '500px', justifyContent:'space-evenly'}}>
      <h1>Welcome, {user.name}</h1>
      Email
      <div style= {{display: 'flex', flexDirection:'column'}}>
     <p>{user.email}</p>
     <input type='text' onChange={handleChange}
                style={{borderRadius:'8px'}}
                />
      <button onClick={submitProfileImage}
      style={{borderRadius:'8px', border:'1px solid #0D6EFD', height:'40px', padding:'6px 12px', color:'white', backgroundColor: '#0D6EFD'}}
      >
        Save changes
        </button>
        </div>
      <div className='mb-3'>
        <input
          type='file'
          accept='image/*, video/*'
          className='form-control'
          onChange={handleImageChange}
          style={{width: '50vw', borderRadius:'5px', alignItems: 'center', display:'flex', justifyContent:'center'}}
        />
      </div>
      <button className='btn btn-primary' onClick={submitProfileImage} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Confirm Upload'}
          </button>

    </div>
  )
}
