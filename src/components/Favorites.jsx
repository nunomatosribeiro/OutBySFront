import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from "../context/Auth.context";
import { apiBaseUrl } from '../config';
import { Link, useParams } from 'react-router-dom';
import CardDetails from './CardDetails';
import { Box, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import Grid from 'react-loading-icons/dist/esm/components/grid';
import { Card } from 'react-bootstrap';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Slider from 'react-slick';
import '../Favorites.css'
const Favorites = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([])
const { userId } = useParams()
const { isLoggedIn } = useContext(AuthContext);
 
 useEffect(() => {
    fetchFavorites()
    console.log(favorites, 'VER AQUI A DATA DOS FAVORITES');
  }, [userId]);
  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(`${apiBaseUrl}/favorites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data, 'RESPONSE');
  
      const favoritesArray = response.data || [];
      setFavorites(favoritesArray);
  
      console.log(favoritesArray, 'VER AQUI A DATA DO GET DOS FAVORITES');
      
    } catch (error) {
      console.error("Error fetching likes count:", error);
    }
  };
 
  const onLike = (liked) => {
    setLikesCount(liked ? likesCount + 1 : likesCount - 1);
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
      
      // Update the isLiked state in GridMainPage
      setIsLiked((prevIsLiked) => {
        const updatedLikes = { ...prevIsLiked };
        updatedLikes[post._id] = false;
        return updatedLikes;
      });
  
      localStorage.removeItem(`like_${post._id}`);
  
      // Optimistic UI Update
      setIsLoading(false);
    } catch (error) {
      // Rollback changes if the request fails
      console.error('Error unliking post:', error);
      console.log('Rolling back changes...');
      setIsLiked((prevIsLiked) => {
        const updatedLikes = { ...prevIsLiked };
        updatedLikes[post._id] = true;
        return updatedLikes;
      });
      localStorage.setItem(`like_${post._id}`, 'true');
      setLikesCount(likesCount + 1);
  
      setIsLoading(false);
    }
  };
  const settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          
        
        },
      },
      {
        breakpoint: 768,
       
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
 <Slider {...settings1}>
  {Array.isArray(favorites) ? 
    favorites.map((favorite, index) => (
      <div className="image-text-slick-container" key={`${favorite._id}`}>
       <Card className='card-style' >
<Link to={`/posts/details/${favorite._id}`}>
  <div className="image-text-slick-container2">
    <CardMedia
      component="img"
      src={`https://res.cloudinary.com/du6zxcbrm/image/upload/${String(
        favorite.allMedia[0]
      ).replace('image/', '')}`}
      alt={`Image ${favorite.title}`}
    />
  </div>
</Link>
<CardContent>
  <Link
    to={`/posts/details/${favorite._id}`}
    style={{
      listStyleType: 'none',
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {favorite.title}
  </Link>
  <Typography variant="body2" color="text.secondary">
    {favorite.description}
  </Typography>
</CardContent>
<CardActions disableSpacing>
  <IconButton
    aria-label="RemoveFromFavorites"
    className="favorites"
    onClick={() => handleUnlike(favorite)}
    style={{
      border: 'none',
      color: favorites[index] ? 'rgb(64, 105, 194)' : 'inherit',
      backgroundColor: 'transparent',
    }}
  >
    <FavoriteIcon />
  </IconButton>
</CardActions>
</Card>
      </div>
    ))
   : (
    <p>No favorites yet!</p>
  )}
</Slider>
    </div>
  );
}

 
export default Favorites;