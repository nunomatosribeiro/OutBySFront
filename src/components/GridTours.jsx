import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [favorites, setFavorites] = useState(Array(posts.length).fill(false));

  useEffect(() => {
    fetchPosts();
  }, []);

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
    } catch (error) {
      console.log('Error fetching posts by category', error);
    }
  };
  const handleFavoriteClick = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
    console.log(index)
  };
  const settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
       
        settings: {
          slidesToShow: 2,
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
               onClick={() => handleFavoriteClick(index)} 
               style={{ border:'none', color: favorites[index] ? 'red' : 'inherit', backgroundColor: 'transparent' }} 
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
