// components/ReviewPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../config';
import { Card, ListGroup } from 'react-bootstrap';
import { Rating } from '@mui/material';
import RatingComponent from './Ratings';
import StarRating from './StarRating';
import "../StarRating.css"
import '../Pagedetails.css'
import Slider from 'react-slick';

const ReviewPage = ({ match }) => {
  const [reviews, setReviews] = useState([])
  const [ratings, setRatings] = useState(0);
  const [userRatings, setUserRatings] = useState(0);
  const [comments, setComments] = useState('');
  const [posts, setPosts] = useState(0)
  const [avg, setAvg] = useState(0)
  const { postId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reviewsData = await axios.post(`${apiBaseUrl}/posts/${postId}/reviews`, {
        rating: userRatings,
        comments,
      });
      console.log('check here the REVIEWS', reviewsData)
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };


   useEffect(() => {
   
    const fetchReviews = async () => {
      try {
        
        const response = await axios.get(`${apiBaseUrl}/posts/${postId}/reviews`);
        const posts = response.data; 

        console.log('Check here the REVIEWS',posts);
        if (Array.isArray(posts.reviews)) {
          setReviews(posts.reviews);
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
    
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/posts/${postId}/reviews`);
        const reviews = res.data.reviews; 

        if (reviews.length > 0) {
          const firstReviewRating = reviews.rating;
          setRatings(firstReviewRating);
          console.log('CHECK HERE THE setRATINGS', firstReviewRating);
        }
      } catch (error) {
        console.log('Not possible to fetch rating for this post', error);
      }
    };
    fetchRatings();
  }, [postId]);
console.log('CHECK HERE THE RATINGS',ratings)

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  variableWidth: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
     
      settings: {
        slidesToShow: 4,
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
    <div className='review-container-page'>
      <div className='reviews-container' >
        <Slider {...settings}>
    {reviews.map((review, index) =>
          <div className='image-text-slick-container' key={index}>
            <Card style={{margin: '8px', borderRadius: '4px'}}>
            {/* <strong>{review.name}</strong> */}
         <RatingComponent className='rating-component' 
         ratings={review.rating} />
           {/*  <p>{review.createdAt.substring(0, 10)}</p> */}
            <p>{review.comments}</p>
            </Card>
          </div>
      )}
      </Slider>
</div>
<div className='submitReviewContainer'>
      <h1>Submit a Review</h1>
      <form onSubmit={handleSubmit}>
        <StarRating
              value={userRatings}
              onStarClick={(nextValue) => setUserRatings(nextValue)}
            />
        
          <textarea
          placeholder='comments'
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        
        <button type="submit">Submit Review</button>
      </form>
      </div>
    </div>
    
  );
};

export default ReviewPage;

/* import React, {useState,  useEffect} from 'react'
import { Link } from 'react-router-dom'
 import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
 import Rating from '../components/Rating'
 import { useDispatch, useSelector } from 'react-redux'
 import Message from '../components/Message'
 import Loader from '../components/Loader'
 import { listProductDetails, createProductReview } from '../actions/productActions'
 import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
 import {FaStar} from 'react-icons/fa'


 const ProductScreen = ({ match }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate

   useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
   }, [dispatch, match, successProductReview])

   const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

   
  
 
    return (
      <>
        <Link className='btn btn-light my-3' to='/'>
          Go Back
        </Link>
        {loading ? 
        <Loader /> :
        error ?
        <Message variant='danger'>{error}</Message>:(
          <>
          <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
 
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
               <ListGroup variant='flush'>
                 {product.reviews.map((review) => (
                   <ListGroup.Item key={review._id}>
                     <strong>{review.name}</strong>
                     <Rating value={review.rating} />
                     <p>{review.createdAt.substring(0, 10)}</p>
                     <p>{review.comment}</p>
                   </ListGroup.Item>
                 ))}
                 <ListGroup.Item>
                 {errorProductReview && (
                     <Message variant='danger'>{errorProductReview}</Message>
                   )}
                   {userInfo ? (
                     <form className="form" onSubmit={submitHandler}>
                     <div>
                       <h2>Write a customer review</h2>
                     </div>
                     <div>
                       <label htmlFor="rating">Rating</label>
                       <select id="rating" value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                           <option value="">Select</option>
                           <option value="1">1- Bad</option>
                           <option value="2">2- Fair</option>
                           <option value="3">3- Good</option>
                           <option value="4">4- Very good</option>
                           <option value="5">5- Excelent</option>

                       </select>
                     </div>
                       <div>
                       <label htmlFor="comment">Comment</label>
                       <textarea
                         id="comment"
                         value={comment}
                         onChange={(e) => setComment(e.target.value)}
                       ></textarea>
                     </div>
                    
                     <div>
                       <label />
                       <button className="primary" type="submit">
                         Submit
                       </button>
                     </div>
                     
                   </form>
                     
                   ) : (<Message>Please <Link to='/login'
                   >sign in</Link>to write a review</Message>)}
                   
                 </ListGroup.Item>
              </ListGroup>
              

          </Col>
        </Row>
        </>
        )

        }
        

        
      </>
    )
  }
 
  export default ProductScreen; */