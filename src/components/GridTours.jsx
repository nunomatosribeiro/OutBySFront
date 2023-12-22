import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/Auth.context";
import { apiBaseUrl } from '../config';
import Slider from "react-slick";
import CardMedia from '@mui/material/CardMedia';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../SlickCarouselTours.css'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import { CardActions, CardContent, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function GridMainPage () {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([Array(posts.length).fill(false)]);
  const { user, isLoggedIn } = useContext(AuthContext);
  if (user) {
    console.log('check here the user id', user._id);
  } else {
    console.log('User is not available or not logged in.');
  }
  useEffect(() => {
    fetchPosts();
  }, []);
useEffect(() => {
    if (user) {
      handleFavoritesClick(); // Trigger favorites update when the component mounts and user is available
    }
  }, [user]);
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/posts/Tours`);
      const postsWithImageData = await Promise.all(
        response.data.map(async (post) => {
          if (post.imageData && post.public_id) {
            const cloudinaryUrl = `https://res.cloudinary.com/du6zxcbrm/image/upload/v1699357162/${post.public_id}`;
            console.log('here', post.allMedia[0]);
            return { ...post, cloudinaryUrl };
          } else {
            return post;
          }
        })
      );

      setPosts(postsWithImageData);
      console.log('check here the posts data, ver se tem ID para o codigo', posts)
    } catch (error) {
      console.log('Error fetching posts by category', error);
    }
  };
  
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
  };

  const handleAddToFavorites = async (post) => {
    try {
      if (user && user._id) {
        const token = localStorage.getItem("authToken");
        const userData = await axios.post(`${apiBaseUrl}/favorites/${user._id}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const currentFavorites = userData.data.favorites || [];
        const isAlreadyInFavorites = currentFavorites.includes(post._id);

        if (!isAlreadyInFavorites) {
          // If not in favorites, add it to the array
          const updatedFavorites = [...currentFavorites, post._id];

          await axios.put(`${apiBaseUrl}/users/${user._id}`, { favorites: updatedFavorites });

          alert('Post added to favorites!');
          setFavorites(updatedFavorites);
        } else {
          alert('Post is already in favorites!');
        }
      } else {
        console.error('User or user._id is undefined.');
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
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
    <div className='slick-carousel-tours-mainpage-container' >
      
    
      <Slider {...settings1}>
      {posts.map((post, index) => ( 
          <div className='image-text-slick-container' key={post.title} >
            <Card style={{margin: '8px', borderRadius: '4px'}}>
             <Link to={`/posts/details/${post._id}`}>
              <div className='image-text-slick-container2' >
              <CardMedia 
              component="img" 
              src={`https://res.cloudinary.com/du6zxcbrm/image/upload/${String(
              post.allMedia[0]
              ).replace('image/', '')}`}
              alt={`Image ${post.title} `}
              />
          </div>
            </Link>
            <CardContent>
      <Link to={`/posts/details/${post._id}`}
      style={{listStyleType: 'none', textDecoration: 'none',
    color: 'black'}}
    >
      {post.title}
      </Link>
        {/* subheader="September 14, 2016" */}
        <Typography variant="body2" color="text.secondary">
        {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="AddToFavorites"
          className='favorites'
               onClick={() => handleAddToFavorites(post)} 
              style={
                isLoggedIn
                  ? {
                      border: 'none',
                      color: favorites.includes(post._id) ? 'rgb(64, 105, 194)' : 'inherit',
                      backgroundColor: 'transparent',
                    }
                  : {border: 'none', color: 'inherit', backgroundColor: 'transparent' } // Empty object for no styles when not logged in
              }
          >
          <FavoriteIcon />
        </IconButton>
        </CardActions>
            </Card>
          </div>
       ))} 
      </Slider>
     
  
      </div>
  );
}

export default GridMainPage;
