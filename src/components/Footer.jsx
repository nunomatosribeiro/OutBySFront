import { useContext } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaHeart  } from 'react-icons/fa';
import '../Footer.css'
import WhatsAppButton from './WhatsApp';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';
const Footer = ({ isOpen }) => {
  const { isAdmin } = useContext(AuthContext)
    return ( 
      <div>
       {isOpen ? '' : (
        <footer className="footer">
        <div className="footer-content">
            <div className='footer-wo-Bottom'>
          <div className="footer-section">
            <h2>OutByS</h2>
            <ul className="footer-section-ul">
              <li><Link to={"/aboutus"}>About Us</Link></li>
              <li><Link to={"/"}>Careers</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>Services</h2>
            <ul className="footer-section-ul">
              <li><Link to={`/Tailormade`}>Tailor Made Experiences</Link></li>
              <li><Link to={`/posts/Food`}>Food</Link></li>
              <li><Link to={`/posts/Activities`}>Activities</Link></li>
              <li><Link to={`/posts/Tours`}>Tours</Link></li>
              {isAdmin ? <li><Link to={`/createpost`}>Posts</Link></li> : ''}
            </ul>
          </div>
          <div className="footer-section">
            <h2>Connect with Us</h2>
            <div className="social-icons">
              <Link to={"/"} className='facebook-icon'><FaFacebook /></Link>
              <Link to={"/"} className='twitter-icon'><FaTwitter /></Link>
              <Link to={"/"} className='instagram-icon'><FaInstagram /></Link>
              
              <WhatsAppButton />
            </div>
          </div>
          </div>
           <div className="footer-bottom">
          <p>&copy; 2023 OutByS.
          Made with <FaHeart size={16} /> in Porto
          </p>
        </div>
        </div>
      
      </footer>)}
      </div>
     );
}
 
export default Footer;
