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

const Favorites = ({ isOpen, posts }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([])
const { postId } = useParams()
const { userId } = useParams()
const { user, isLoggedIn } = useContext(AuthContext);
  useEffect(() => {


    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(`${apiBaseUrl}/favorites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const favorites = response.data.favorites; 
      console.log(response.data, 'VER AQUI A DATA DO GET DOS FAVORITES')
      if (favorites.length > 0) {
        const favoritesDetailsResponse = await axios.get(`${apiBaseUrl}/posts/details`, {
          // Pass favorite ObjectIds as query parameters
          params: { favorites: favorites.join(',') },
        });
  
        const favoritePosts = favoritesDetailsResponse.data;
        console.log('Favorite Posts:', favoritePosts);
  
        // Update state with the fetched favorite posts
        setFavorites(favoritePosts);

    } else {
      console.log('No favorites yet!');
      setFavorites([]);
    }
    } catch (error) {
      console.error("Error fetching likes count:", error);
    }
  };
  const onLike = (liked) => {
    setLikesCount(liked ? likesCount + 1 : likesCount - 1);
  };


  const handleUnlike = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");

      await axios.delete(`${apiBaseUrl}/posts/${postId}/favorites`, {
        data: { postId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLiked(false);
      localStorage.removeItem(`like_${postId}`);
      setLikesCount(likesCount - 1);
      onLike && onLike(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error unliking post:", error);
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
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <Slider {...settings1}>
          {favorites.map((favorite, index) => (
            <div className="image-text-slick-container" key={index}>
              {/* Display details of the favorite post */}
              <Card style={{ margin: '8px', borderRadius: '4px' }}>
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
                    style={
                      isLoggedIn
                        ? {
                            border: 'none',
                            color: 'rgb(64, 105, 194)',
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
      )}
    </div>
  );
}

 
export default Favorites;
