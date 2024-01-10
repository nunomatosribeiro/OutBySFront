import React from 'react'
import Favorites from '../components/Favorites';
import '../Favorites.css'
import { AuthContext } from '../context/Auth.context';
import { useContext } from 'react';
const FavoritesPage = ({ isOpen }) => {
  
  return (
    <div className={isOpen ? "mainpage-container-blur" :'favorites-container'}>
    <h2>Your Wishlist</h2>
    <hr />
     <Favorites />
    </div>
  )
}

export default FavoritesPage;
