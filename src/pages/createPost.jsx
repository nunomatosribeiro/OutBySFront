import axios from "axios";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router";
import { apiBaseUrl } from "../config";
import CloudinaryUpload from "../components/CloudinaryUpload";
import { useState } from "react";


function CreatePostPage({ setImageData,imageData}) {
  const [allMedia, setAllMedia] = useState([]);

  
  const nav = useNavigate();

  const submitPost = async (postData) => {
    console.log('postData look herererererer:', postData); 
    try {
/*       const token = localStorage.getItem("authToken");
 */
      const postDataWithMedia = { ...postData, allMedia };
       await axios.post(`${apiBaseUrl}/posts/createpost`, postDataWithMedia/* , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } */);
 window.location.reload();
   
     
    } catch (error) {
      console.error(error);
      
    }
  };

  const updateMediaList = (updatedMedia) => {
    const latestImageData = updatedMedia.length > 0 ? updatedMedia[0] : '';
    setImageData(latestImageData);
  };
  const defaultPostValues = {
    title: "Default Title",
    description: "Default Content",
    category: "Default Category",
  };
  return (
    <div className='CreatePageContainer'>
      
      <h1>Create your post here</h1>
      <div className='formContainer'>
      <CloudinaryUpload initialMedia={[]} onMediaUpdated={updateMediaList} allowMultiple={true} 
        setImageData={setImageData}
        imageData={imageData}
        allMedia={allMedia}
        setAllMedia={setAllMedia}
         /> 
      <PostForm className='inputContainer'
        onSubmit={async (postData) => {
          console.log("Creating post with data:", postData);
          await submitPost(postData);
        }}
        defaultValues={{
          defaultPostValues
        }}
       
        allMedia={allMedia}
        setAllMedia={setAllMedia}
      />
     
      </div>
    </div>
  );
}

export default CreatePostPage;
