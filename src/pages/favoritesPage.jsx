import React from 'react'
import Favorites from '../components/Favorites';
import '../Favorites.css'
const FavoritesPage = ({ isOpen, posts }) => {
  return (
    <div className={isOpen ? "mainpage-container-blur" :'favorites-container'}>
    <h2>Your Wishlist</h2>
    <hr />
    <Favorites />
    </div>
  )
}

export default FavoritesPage;
