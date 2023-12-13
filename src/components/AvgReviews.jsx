// components/ReviewPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../config';
import { ListGroup } from 'react-bootstrap';
import { Rating } from '@mui/material';
import RatingComponent from './Ratings';
import StarRating from './StarRating';
import '../StarRating.css'
import AvgRatingComponent from './AvgRating';

const AvgReviewComponent = ({ match }) => {
  const [posts, setPosts] = useState(0)
  const [avg, setAvg] = useState(0)
  const { postId } = useParams();

   
   useEffect(() => {
   
    const fetchReviews = async () => {
      try {
       
        const response = await axios.get(`${apiBaseUrl}/posts/${postId}/reviews`);
        const posts = response.data; 

        console.log('Check here the REVIEWS',posts);
        if (Array.isArray(posts.reviews)) {
          
         setPosts(posts)
         setAvg(posts)
        } else {
          console.error('Fetched data is not an array:', posts);
        }
        
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };
 fetchReviews();
  }, []);

  return (
    <div className='review-container-page'>
          <p><AvgRatingComponent className='rating-component' 
         ratings={posts.avgRating} />
         {posts.avgRating} ({posts.numReviews} reviews)</p>
          
          
</div>

  )}

export default AvgReviewComponent;