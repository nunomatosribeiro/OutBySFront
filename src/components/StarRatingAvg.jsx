import StarRatingComponent from 'react-star-rating-component';


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