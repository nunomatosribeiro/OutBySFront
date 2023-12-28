import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaHeart  } from 'react-icons/fa';
import '../Footer.css'
import WhatsAppButton from './WhatsApp';
import { Link } from 'react-router-dom';
const Footer = ({ isOpen }) => {
    return ( 
      <div>
       {isOpen ? '' : (
        <footer className="footer">
        <div className="footer-content">
            <div className='footer-wo-Bottom'>
          <div className="footer-section">
            <h2>OutByS</h2>
            <ul className="footer-section-ul">
              <li><a href="/aboutus">About Us</a></li>
              <li><a href="/">Careers</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>Services</h2>
            <ul className="footer-section-ul">
              <li><Link to={`/Tailormade`}>Tailor Made Experiences</Link></li>
              <li><Link to={`/posts/Food`}>Food</Link></li>
              <li><Link to={`/posts/Activities`}>Activities</Link></li>
              <li><Link to={`/posts/Tours`}>Tours</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>Connect with Us</h2>
            <div className="social-icons">
              <a href="/" className='facebook-icon'><FaFacebook /></a>
              <a href="/" className='twitter-icon'><FaTwitter /></a>
              <a href="/" className='instagram-icon'><FaInstagram /></a>
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
