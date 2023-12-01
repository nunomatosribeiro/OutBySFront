import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../config';
import Slider from "react-slick";
import { CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../SlickCarouselTours.css'
import { Link } from 'react-router-dom';
import Grid from 'react-loading-icons/dist/esm/components/grid';
import { Card } from 'react-bootstrap';
import FavoriteIcon from '@mui/icons-material/Favorite';

function GridFood() {
    const [posts, setPosts] = useState([]);
    const [favorites, setFavorites] = useState(Array(posts.length).fill(false));

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/posts/Food`);
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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <div className='slick-carousel-tours-mainpage-container' >
      
    <Grid >
    <Slider {...settings}>
    {posts.map((post, index) => ( 
        <div className='image-text-slick-container' key={post.title} >
          <Card style={{margin: '5px', borderRadius: '5px'}}>
           <Link to={`/posts/details/${posts._id}`}>
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
        aria-label="add to favorites"
        component="Favorites" 
            onClick={() => handleFavoriteClick(index)}
            style={{ color: favorites[index] ? 'red' : 'inherit' }}
        >{/* favorites={post.favorites} */}
        <FavoriteIcon className='Favorites'/>
      </IconButton>
      </CardActions>
          </Card>
        </div>
     ))} 
    </Slider>
    </Grid>

    </div>
  )
}
export default GridFood
