import { useState } from 'react'
import axios from 'axios'
import { CloudinaryContext, Image, Video } from 'cloudinary-react'
import { apiBaseUrl } from '../config'
import '../signup.css'
const CloudinaryUpload = ({ initialMedia, onMediaUpdated, allowMultiple, setImageData, imageData, allMedia,
  setAllMedia }) => {
  const [media, setMedia] = useState(Array.isArray(initialMedia) ? initialMedia : [])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [confirmUpload, setConfirmUpload] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = e => {
    
    setSelectedFiles(e.target.files[0])
    setConfirmUpload(e.target.files.length > 0)
  }
const uploadImage = () => {
const formData = new FormData()
formData.append("file", selectedFiles)
formData.append("upload_preset", "zg8ivfm6")
console.log('selectedFiles here<---------', selectedFiles)
const postImage = async () => {
  try{
    const response = await axios.post("https://api.cloudinary.com/v1_1/du6zxcbrm/upload",
    formData)
    const dataAsString = `${response.data.resource_type}/${response.data.public_id}`
    console.log('response here<---------', response)
    setImageData(response.data)
    const updatedMedia = allowMultiple ? [...allMedia, dataAsString] : [dataAsString]
    setAllMedia(updatedMedia)
    onMediaUpdated(updatedMedia)
    setConfirmUpload(false);
    setSelectedFiles([]);

      await axios.post(`${apiBaseUrl}/posts/createpost`, {
        allMedia: response.data.public_id,
        // Other image data you want to store
        title: 'YourTitle', // Example: Pass other form data
        description: 'YourDescription',
        category: 'YourCategory',
      
    });
  } catch(error){
      console.log('Error trying to upload', error)
    }
}
postImage()
}


  const deleteMedia = async publicId => {
    const updatedMedia = media.filter(item => item.split('/')[1] !== publicId)
    setMedia(updatedMedia)
  /*   onMediaUpdated(updatedMedia) */

    // Try to remove from Cloudinary as well
    try {
      await axios.delete(`https://api.cloudinary.com/v1_1/du6zxcbrm/image/destroy`, {
        params: {
          public_id: publicId,
        },
      })
    } catch (error) {
      console.error('Error deleting media from Cloudinary:', error)
    }
  }

  return (
    <div className='container mt-4'>
      <div className='mb-3'>
        <input
          type='file'
          accept='image/*, video/*'
          className='form-control'
          onChange={handleFileChange}
        />
      </div>
      
      {confirmUpload && (
        <>
          <button className='btn btn-primary' onClick={uploadImage} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Confirm Upload'}
          </button>
          <p>Click the button above to confirm the upload.</p>
        </>
      )}
      <CloudinaryContext cloudName={'du6zxcbrm'} >
        <div className='row'>
          {/* {media.map(item => {
            const itemSplit = item.split('/')
            const resourceType = itemSplit[0]
            const publicId = itemSplit[1]
            return (
              <div key={publicId} className='media-item position-relative'>
                <div>
                  {resourceType === 'image' ? (
                    <Image publicId={publicId} width='300' crop='scale' />
                  ) : (
                    <Video publicId={publicId} controls width='300' crop='scale' />
                  )}
                  <button
                    className='btn btn-danger btn-sm position-absolute top-0'
                    onClick={() => deleteMedia(publicId)}
                  >
                    <i className='bi bi-trash'></i>
                  </button>
                </div>
              </div>
            )
          })} */}
        </div>
        {imageData && (
      <Image 
      style={{width: '200px', borderRadius: ' 15px', margin: '10px'}} 
      cloudName="du6zxcbrm" 
      publicId={`https://res.cloudinary.com/du6zxcbrm/image/upload/v1699357162/${imageData.public_id}`}
      />
      )}
      </CloudinaryContext>
      
    </div>
  )
}

export default CloudinaryUpload
