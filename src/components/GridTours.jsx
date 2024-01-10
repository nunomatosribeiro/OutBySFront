import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/Auth.context';
import { apiBaseUrl } from '../config';
import Slider from 'react-slick';
import CardMedia from '@mui/material/CardMedia';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../SlickCarouselTours.css';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { CardActions, CardContent, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function GridMainPage({ openModal }) {
  const [likesCount, setLikesCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const { user, isLoggedIn } = useContext(AuthContext);

  // Load liked status from local storage on component mount
  const initialLikedState = JSON.parse(localStorage.getItem('likedPosts')) || {};
  const [isLiked, setIsLiked] = useState(initialLikedState);

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
        const token = localStorage.getItem('authToken');

        await axios.post(
          `${apiBaseUrl}/favorites/${user._id}`,
          { postId: post._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update local storage and state
        const updatedLikes = { ...isLiked, [post._id]: true };
        localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
        setIsLiked(updatedLikes);

        setLikesCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const handleUnlike = async (post) => {
  try {
    const token = localStorage.getItem('authToken');

    await axios.delete(`${apiBaseUrl}/favorites/${post._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Update local storage and state
    const updatedLikes = { ...isLiked, [post._id]: false };
    localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));
    setIsLiked(updatedLikes);

    setLikesCount((prevCount) => Math.max(prevCount - 1, 0));
  } catch (error) {
    console.error('Error unliking post:', error);
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
    <div className='slick-carousel-tours-mainpage-container'>
      <Slider {...settings1}>
        {posts.map((post, index) => (
          <div className='image-text-slick-container' key={post.title}>
            <Card style={{ margin: '8px', borderRadius: '4px' }}>
              <Link to={`/posts/details/${post._id}`}>
                <div className='image-text-slick-container2'>
                  <CardMedia
                    component='img'
                    src={`https://res.cloudinary.com/du6zxcbrm/image/upload/${String(
                      post.allMedia[0]
                    ).replace('image/', '')}`}
                    alt={`Image ${post.title} `}
                  />
                </div>
              </Link>
              <CardContent>
                <Link
                  to={`/posts/details/${post._id}`}
                  style={{
                    listStyleType: 'none',
                    textDecoration: 'none',
                    color: 'black',
                  }}
                >
                  {post.title}
                </Link>
                <Typography variant='body2' color='text.secondary'>
                  {post.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label='AddToFavorites'
                  className='favorites'
                  onClick={() => (isLoggedIn ? (isLiked[post._id] ? handleUnlike(post) : handleAddToFavorites(post, index)) : openModal)}
                  style={
                    isLoggedIn
                      ? {
                          border: 'none',
                          color: isLiked[post._id] ? 'rgb(64, 105, 194)' : 'inherit',
                          backgroundColor: 'transparent',
                        }
                      : {
                          border: 'none',
                          color: 'inherit',
                          backgroundColor: 'transparent',
                        }
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