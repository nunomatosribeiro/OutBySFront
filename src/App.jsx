import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useParams } from 'react-router-dom';
import MainPage from './pages/mainpage';
import Login from './pages/login';
import Signup from './pages/signup';
import Navbar from './components/NavBar';
import Modal from './components/Modal';
import ToursPage from './pages/tours';
import TailorMade from './pages/tailormade';
import FoodPage from './pages/food';
import ActivitiesPage from './pages/activities';
import CreatePostPage from './pages/createPost';
import AllPostsByCategory from './pages/AllPostsByCategory'
import { Cloudinary } from "@cloudinary/url-gen";
import Footer from './components/Footer';
import PageDetails from './pages/pageDetails';
import AboutUs from './pages/aboutUs';
import ReserveNow from './components/ReserveNow';
import TermsAndConditions from './pages/termsAndConditions';
import { Reviews } from '@mui/icons-material';
import Profile from './pages/profile';
import FavoritesPage from './pages/favoritesPage';
import axios from 'axios';
import { apiBaseUrl } from './config';
import { AuthContext } from './context/Auth.context';

function App() {
  const [showModal, setShowModal] = useState(false) //Apagar
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [imageData, setImageData] = useState("")
  const [posts, setPosts] = useState([])
  const [favorites, setFavorites] = useState([]);
  const [favoritesColor, setFavoritesColor] = useState([])
  const { category } = useParams()
  const { user, isLoggedIn } = useContext(AuthContext);
  const cld = new Cloudinary({cloud: {cloudName: 'du6zxcbrm'}});

  useEffect(() => { 
    fetchPosts()
  }, [category])
  
    const fetchPosts = async () => {
      try {
      
        const response = await axios.get(`${apiBaseUrl}/posts`)
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
const openModal = () => {
  setIsModalOpen(true)
}
const closeModal = () => {
setIsModalOpen(false)
}
/* useEffect(() => {
  if (user) {
    handleFavoritesClick(); // Trigger favorites update when the component mounts and user is available
  }
}, []);


 const handleFavoritesClick = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const userData = await axios.post(`${apiBaseUrl}/favorites/${user._id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const currentFavorites = userData.data.favorites || [];
    setFavorites(currentFavorites);
  } catch (error) {
    console.error('Error updating favorites:', error);
  }
};  */

const handleAddToFavorites = async (post) => {
  try {
    if (user && user._id) {
      const token = localStorage.getItem("authToken");

        // Update the UI immediately
  

      const userData = await axios.post(
        `${apiBaseUrl}/favorites/${user._id}`,
        { postId: post._id },  // Ensure postId is included in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const currentFavorites = userData.data.favorites || [];
      const isAlreadyInFavorites = currentFavorites.includes(post._id);
 setFavoritesColor(isAlreadyInFavorites)
      if (!isAlreadyInFavorites) {
        // If not in favorites, add it to the array
        const updatedFavorites = [...currentFavorites, post._id];

        await axios.put(
          `${apiBaseUrl}/users/${user._id}`, {
          favorites: updatedFavorites,
        });

        alert('Post added to favorites!');
        setFavorites(updatedFavorites);
         setIsLiked(true);
      }
    } else {
      console.error('User or user._id is undefined.');
    }
  } catch (error) {
    console.error('Error updating favorites:', error);
  }
};
const handleUnlike = async (post) => {
  try {
    console.log('Starting handleUnlike...');
    setIsLoading(true);
    const token = localStorage.getItem("authToken");

    // Make the DELETE request
    await axios.delete(`${apiBaseUrl}/favorites/${post._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('POSTID', post._id);
    console.log('Post unliked successfully!');
    setIsLiked(false);
    localStorage.removeItem(`like_${post._id}`);

    // Optimistic UI Update
    setIsLoading(false);
  } catch (error) {
    // Rollback changes if the request fails
    console.error('Error unliking post:', error);
    console.log('Rolling back changes...');
    setIsLiked(true);
    localStorage.setItem(`like_${post._id}`, 'true');
    setLikesCount(likesCount + 1);

    setIsLoading(false);
  }
};
  return (
    <>
       <Navbar openModal={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <Routes>
        <Route path='/' element={<MainPage handleAddToFavorites={handleAddToFavorites} handleUnlike={handleUnlike} isOpen={isModalOpen} openModal={openModal}  />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/posts/:category' element={<AllPostsByCategory favoritesColor={favoritesColor} favorites={favorites} handleAddToFavorites={handleAddToFavorites} handleUnlike={handleUnlike} isOpen={isModalOpen} />} />
        {/* <Route path='/users/:userId' element={<ReserveNow  />} /> */}
        <Route path='/posts/details/:postId' element={<PageDetails isOpen={isModalOpen}  />} />
        <Route path='/aboutus' element={<AboutUs isOpen={isModalOpen} />} />
        <Route path="/:postId/review" element={Reviews} />
        <Route path='/profile/:userId' element={<Profile />} />
        <Route path='/Tailormade' element={<TailorMade handleAddToFavorites={handleAddToFavorites} handleUnlike={handleUnlike}  isOpen={isModalOpen} />} />
        <Route path='/Food' element={<FoodPage handleAddToFavorites={handleAddToFavorites} handleUnlike={handleUnlike} isOpen={isModalOpen} />} />
        <Route path='/Activities' element={<ActivitiesPage handleUnlike={handleUnlike} isOpen={isModalOpen} />} />
        <Route path='/Tours' element={<ToursPage handleAddToFavorites={handleAddToFavorites} handleUnlike={handleUnlike} isOpen={isModalOpen} />} />
        <Route path='/favorites/:userId' element={<FavoritesPage posts={posts} handleAddToFavorites={handleAddToFavorites} handleUnlike={handleUnlike} isOpen={isModalOpen} />} />
        <Route path='/createpost' element={<CreatePostPage imageData={imageData} setImageData={setImageData} />} />
        <Route path='/general-terms-and-conditions' element={<TermsAndConditions />} />
      </Routes>
      <Footer isOpen={isModalOpen} />
    </>
  )
}

export default App