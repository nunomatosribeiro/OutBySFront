import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useParams } from 'react-router-dom';
import MainPage from './pages/mainpage';
import Login from './pages/login';
import Signup from './pages/signup';
import Navbar from './components/NavBar';
import Modal from './components/Modal';
import ToursPage from './pages/tours';
import WishlistPage from './pages/wishlist';
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
import { Reviews } from '@mui/icons-material';

function App() {
  const [showModal, setShowModal] = useState(false) //Apagar
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [imageData, setImageData] = useState("")
  const cld = new Cloudinary({cloud: {cloudName: 'du6zxcbrm'}});

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
        <Route path='/posts/:category' element={<AllPostsByCategory />} />
        {/* <Route path='/users/:userId' element={<ReserveNow  />} /> */}
        <Route path='/posts/details/:postId' element={<PageDetails  />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path="/:postId/review" element={Reviews} />

        <Route path='/Tailormade' element={<TailorMade />} />
        <Route path='/Food' element={<FoodPage />} />
        <Route path='/Activities' element={<ActivitiesPage />} />
        <Route path='/Tours' element={<ToursPage />} />
        <Route path='/Wishlist' element={<WishlistPage />} />
        <Route path='/createpost' element={<CreatePostPage imageData={imageData} setImageData={setImageData} />} />
      </Routes>
      <Footer isOpen={isModalOpen} />
    </>
  )
}

export default App