import StarRatingComponent from 'react-rating-stars-component';


const StarRating = ({ onStarClick, value }) => (
  <StarRatingComponent
    name="rating"
    starCount={5}
    value={value}
    onStarClick={onStarClick}
     starHoverColor="orange !important"
   
  />
);

export default StarRating;