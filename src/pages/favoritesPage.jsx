import React from 'react'
import Favorites from '../components/Favorites';

const FavoritesPage = ({ isOpen, posts }) => {
  return (
    <div className={isOpen ? "mainpage-container-blur" :''}>
    <h2>Your Wishlist</h2>
    <Favorites posts={posts} />
    </div>
  )
}

export default FavoritesPage;
