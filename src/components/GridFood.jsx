import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../config';
import Slider from "react-slick";
import { CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../SlickCarouselTours.css'
import { Link, useParams } from 'react-router-dom';
import Grid from 'react-loading-icons/dist/esm/components/grid';
import { Card } from 'react-bootstrap';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from '../context/Auth.context';

function GridFood() {
    const [posts, setPosts] = useState([]);
    const [favorites, setFavorites] = useState(Array(posts.length).fill(false));
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [likesCount, setLikesCount] = useState(0)
    const { postId } = useParams()
    const { user, isLoggedIn } = useContext(AuthContext);
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

  const handleAddToFavorites = async (post, index) => {
    try {
      if (user && user._id) {
        const token = localStorage.getItem("authToken");

          // Update the UI immediately
      setIsLiked(true);

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
   
        if (!isAlreadyInFavorites) {
          // If not in favorites, add it to the array
          const updatedFavorites = [...currentFavorites, post._id];
  
          await axios.put(
            `${apiBaseUrl}/users/${user._id}`, {
            favorites: updatedFavorites,
          });
  
          setIsLiked(true);
          setFavorites(updatedFavorites);
         
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
      await axios.delete(`${apiBaseUrl}/favorites/${post._id}`, 
       { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('POSTID', postId);
      console.log('Post unliked successfully!');
      setIsLiked(false);
      localStorage.removeItem(`like_${post._id}`);
  
      // Optimistic UI Update
      setIsLoading(false);
    } catch (error) {
      // Rollback changes if the request fails
      console.error('Error unliking post:', error);
      console.log('Rolling back changes...');
      setIsLiked(false);
      localStorage.setItem(`like_${post._id}`, 'true');
      setLikesCount(likesCount + 1);
  
      setIsLoading(false);
    }
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <div className='slick-carousel-tours-mainpage-container' >
      
   
    <Slider {...settings}>
    {posts.map((post, index) => ( 
        <div className='image-text-slick-container' key={post.title} >
          <Card style={{margin: '5px', borderRadius: '5px'}}>
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
        onClick={() => (isLiked ? handleUnlike(post) : handleAddToFavorites(post))}
            style={
              isLoggedIn
                ? {
                    border: 'none',
                    color: favorites[index] ? 'rgb(64, 105, 194)' : 'inherit',
                    backgroundColor: 'transparent',
                  }
                : {
                    border: 'none',
                    color: 'inherit',
                    backgroundColor: 'transparent',
                  } 
            }
        >
        <FavoriteIcon className='Favorites'/>
      </IconButton>
      </CardActions>
          </Card>
        </div>
     ))} 
    </Slider>
   

    </div>
  )
}
export default GridFood
