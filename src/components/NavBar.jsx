import { useContext, useState } from "react"
import { AuthContext } from "../context/Auth.context"
import { Link, useParams } from "react-router-dom"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FaUser  } from 'react-icons/fa';

import { Dropdown } from 'react-bootstrap';
import { useEffect } from "react";
import '../Navbar.css'
import { apiBaseUrl } from "../config";


const Navbar = ( { openModal }) => {
  const [ profile, setProfile ] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  const [signUp, setSignUp] = useState(false);
  const {userId} = useParams()
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleSignUp = () => {
    setSignUp(!signUp)
  }
    return (
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className='page-header_container'>
          <Link className="logo-NavBar" to={'/'}><h1>
            OutByS</h1>
          </Link>
          
          
          
          {isLoggedIn ? (  
            <div className="wishlist-toggle-navbar">
          <Link to={`${apiBaseUrl}/posts/${userId}/favorites`} ><FavoriteBorderIcon style={{color: 'black'}} /></Link>  
   <Dropdown>
   <Dropdown.Toggle style={{backgroundColor: 'transparent', border: 'transparent'}} variant="success" id="dropdown-basic">
     <FaUser style={{color: "#000000"}} />

   </Dropdown.Toggle>

   <Dropdown.Menu >     
    <img src={profile.picture} width='20' alt="user image" />
     <p style={{ backgroundColor: 'red', width: '50px' }}>{profile.name}</p>
     <Dropdown.Item onClick={logOutUser}>Log out</Dropdown.Item>
   </Dropdown.Menu>
 </Dropdown>
 </div>
          ) : ( 
         <div className="login-signup_container">
            <button href="#" onClick={openModal}>Login/Signup</button>
        </div>
       
        )}
        </div>
      </nav>
      
     
    )
  }
  
  export default Navbar