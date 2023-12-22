import React, { useEffect, useState } from 'react';
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
import PageDetails from './pages/PageDetails';
import AboutUs from './pages/aboutUs';
import ReserveNow from './components/ReserveNow';
import TermsAndConditions from './pages/termsAndConditions';
import { Reviews } from '@mui/icons-material';
import Profile from './pages/profile';
import FavoritesPage from './pages/favoritesPage';
import axios from 'axios';
import { apiBaseUrl } from './config';

function App() {
  const [showModal, setShowModal] = useState(false) //Apagar
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [imageData, setImageData] = useState("")
  const [posts, setPosts] = useState([])
  const { category } = useParams()
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

  return (
    <>
       <Navbar openModal={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <Routes>
        <Route path='/' element={<MainPage isOpen={isModalOpen} openModal={openModal}  />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/posts/:category' element={<AllPostsByCategory isOpen={isModalOpen} />} />
        {/* <Route path='/users/:userId' element={<ReserveNow  />} /> */}
        <Route path='/posts/details/:postId' element={<PageDetails isOpen={isModalOpen}  />} />
        <Route path='/aboutus' element={<AboutUs isOpen={isModalOpen} />} />
        <Route path="/:postId/review" element={Reviews} />
        <Route path='/profile/:userId' element={<Profile />} />
        <Route path='/Tailormade' element={<TailorMade isOpen={isModalOpen} />} />
        <Route path='/Food' element={<FoodPage isOpen={isModalOpen} />} />
        <Route path='/Activities' element={<ActivitiesPage isOpen={isModalOpen} />} />
        <Route path='/Tours' element={<ToursPage isOpen={isModalOpen} />} />
        <Route path='/favorites/:userId' element={<FavoritesPage posts={posts} isOpen={isModalOpen} />} />
        <Route path='/createpost' element={<CreatePostPage imageData={imageData} setImageData={setImageData} />} />
        <Route path='/general-terms-and-conditions' element={<TermsAndConditions />} />
      </Routes>
      <Footer isOpen={isModalOpen} />
    </>
  )
}

export default App