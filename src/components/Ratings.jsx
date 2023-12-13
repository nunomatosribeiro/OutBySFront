import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Rating } from '@mui/material';

const RatingComponent = ({ ratings }) => {
  const stars = [];
  const maxStars = 5;
  const threshold = 0.5;
  for (let i = 1; i <= maxStars; i++) {
    if (i <= ratings) {
      // Full star
      stars.push(<FaStar key={i} style={{ fontSize: '32', color: 'orange' }} />);
    } else if (i - threshold <= ratings) {
      // Half star
      stars.push(<FaStarHalfAlt key={i} style={{ fontSize: '32', color: 'orange' }} />);
    } else {
      // Empty star
      stars.push(<FaRegStar key={i} style={{ fontSize: '32', color: '#ccc' }} />);
    }
  }
  return <div>{stars}</div>;
};

export default RatingComponent;