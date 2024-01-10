import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiBaseUrl } from '../config'
import { useParams } from 'react-router-dom'
import CardDetails from '../components/CardDetails'
import '../AllPostsByCategory.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth.context'

const AllPostsByCategory = ({ isOpen, favoritesColor, favorites }) => {
  const [posts, setPosts] = useState([])
 const { category } = useParams()
 const [likesCount, setLikesCount] = useState(0);
 const { user, isLoggedIn } = useContext(AuthContext);

 // Load liked status from local storage on component mount
 const initialLikedState = JSON.parse(localStorage.getItem('likedPosts')) || {};
 const [isLiked, setIsLiked] = useState(initialLikedState);

 useEffect(() => { 
  fetchPostsByCategory()
}, [category])

  const fetchPostsByCategory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${apiBaseUrl}/posts/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const postsWithImageData = await Promise.all(
        response.data.map(async (post) => {
          if (post.imageData && post.public_id) {
            // Construct the Cloudinary URL for each post
            const cloudinaryUrl = `https://res.cloudinary.com/du6zxcbrm/image/upload/v1699357162/${post.public_id}`;
            return { ...post, cloudinaryUrl };
          } else {
            // If imageData is not available, return the post as is
            return post;
          }
        })
      );
      setPosts(postsWithImageData)
      console.log('DATA BY CATEGORY', postsWithImageData)
    } catch (error) {
      console.log('Error fetching posts by category', error)
    }
  }

 const handleAddToFavorites = async (post, index) => {
   try {
     if (user && user._id) {
       const token = localStorage.getItem('authToken');

       await axios.post(
         `${apiBaseUrl}/favorites/${user._id}`,
         { postId: post._id },
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );

       // Update local storage and state
       const updatedLikes = { ...isLiked, [post._id]: true };
       localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
       setIsLiked(updatedLikes);

       setLikesCount((prevCount) => prevCount + 1);
     }
   } catch (error) {
     console.error('Error updating favorites:', error);
   }
 };

 const handleUnlike = async (post) => {
 try {
   const token = localStorage.getItem('authToken');

   await axios.delete(`${apiBaseUrl}/favorites/${post._id}`, {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   });

   // Update local storage and state
   const updatedLikes = { ...isLiked, [post._id]: false };
   localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
   setIsLiked(updatedLikes);

   setLikesCount((prevCount) => Math.max(prevCount - 1, 0));
 } catch (error) {
   console.error('Error unliking post:', error);
 }
};
 

   


  return (
    <div className={isOpen ? "mainpage-container-blur" : ''} >
        <section id="tours-section01">
<div className="hero-Image-tours">

</div>
</section>

<section id='tours-section02'>
<h1>Selected {category} for you</h1>
    <CardDetails isLiked={isLiked} favoritesColor={favoritesColor} favorites={favorites} handleAddToFavorites={handleAddToFavorites} handleUnlike={handleUnlike} isOpen={isOpen} posts={posts} category={category} />
   </section>
    </div>
    
    
   
  )
}

export default AllPostsByCategory

