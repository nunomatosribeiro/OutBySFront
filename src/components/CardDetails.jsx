import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import '../AllPostsByCategory.css'
import axios from 'axios';
import { apiBaseUrl } from '../config';
import { AuthContext } from "../context/Auth.context";

const CardDetails = ({ posts, favoritesColor, favorites, handleAddToFavorites, handleUnlike, isOpen }) => {
    const [expanded, setExpanded] = React.useState(false);
const [isClicked, setIsClicked] = useState(false);
const [isLiked, setIsLiked] = useState(false);

const { user, isLoggedIn } = useContext(AuthContext);
console.log(user)
const ExpandMore = styled((props) => {

    const { expand, ...other } = props;
    
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
 
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    
  
   
    return ( 
        <div className={isOpen ? "mainpage-container-blur" : ''}>
          
          <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {posts.map((post, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
<Card sx={{ maxWidth: 320 }}>
      {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            U
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }/> */}
        
      
      <Link to={`/posts/details/${post._id}`}>
      <div className="img-wrapper hover-zoom">
      <CardMedia
        component="img"
        height="194"
        src={`https://res.cloudinary.com/du6zxcbrm/image/upload/${String(post.allMedia[0]).replace('image/', '')}`}
        style={{width: '100%', objectFit: 'fill'}}
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
        <IconButton /* aria-label="add to favorites"
          onClick={() => setIsClicked(!isClicked)}
          style={{ color: isClicked ? 'red' : 'inherit' }} */
          aria-label="add to favorites"
          onClick={() => (isLiked ? handleUnlike(post) : handleAddToFavorites(post))}
          style={
            isLoggedIn
              ? {
                  border: 'none',
                  color: favoritesColor[post._id] ? 'rgb(64, 105, 194)' : 'inherit', 
                  backgroundColor: 'transparent',
                }
              : {border: 'none', color: 'inherit', backgroundColor: 'transparent' } // Empty object for no styles when not logged in
          }
          >{/* favorites={post.favorites} */}
          <FavoriteIcon />
          
       
       {/*  className={`btn btn-outline-primary like-button ${
          isLiked ? "selected" : ""
        }`}
        style={isLiked ? { color: "white", background: "blue" } : {}} */}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
        </CardContent>
      </Collapse> */}
    </Card>
     </Grid>
     ))}
     </Grid>
    </Box>
        </div>
     );
}
 
export default CardDetails;