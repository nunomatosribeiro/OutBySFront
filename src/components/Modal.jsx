import React, { useState, useEffect, useContext } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { AuthContext } from "../context/Auth.context";
import axios from "axios";
import { apiBaseUrl } from "../config";
import '../Modal.css'
import { Link } from 'react-router-dom';

const Modal = ( { isOpen, onClose, openModal} ) => {
  const [username, setUsername] = useState("");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const { authenticateUser } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState(null)
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const [signUp, setSignUp] = useState(false); // Added signUp state
    const logOut = () => {
      googleLogout();
      setProfile(null);
    };
    const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
    });
    
    
    
    useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
    );
if(!isOpen){
    return null;
}
    const handleLogin = async e => {
        e.preventDefault()
        setIsLoading(true);
        try {
          const { data } = await axios.post(`${apiBaseUrl}/auth/login`, {
            email,
            password,
          })
          console.log('here is the Login response', data)
          localStorage.setItem('authToken', data.token)
          //Make sure you await the authenticate User as it takes time and you cant access the private route until its finished
          await authenticateUser()
          onClose();
          
        } catch (err) {
          console.log(err);
        }
        setIsLoading(false);
        
      }
      const handleToggleSignUp = () => {
        setSignUp(!signUp);
      };
      return (
        <div className="modal-container-active">
          <div className='modal-container-responsive'>
            <div className="modal-image"></div>
            <div className="modal-form">
              <form onSubmit={handleLogin}>
                <input
                  className="inputStyle"
                  type='email'
                  value={email}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder='Email'
                />
                <input
                  className="inputStyle"
                  type='password'
                  value={password}
                  required
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder='Password'
                />
              </form>
              <div className="buttonContainer">
                <button className="buttonStyle" onClick={handleLogin} >
                  Login
                </button>
                <button className="closeButton" onClick={onClose}>
                  Close
                </button>
              </div>
           
            
           
          
          <div className="media-singup_container">
            
            <div className='socialmedia-signin-container'>
              <br />
             
              <img
                onClick={() => login()}
                src='../public/google_signin.png'
                alt="Google Sign In"
              />
              </div>
              <Link to={`/SignUp`} style={{fontSize:'12px'}} onClick={onClose}>
            {'Switch to Sign Up'}
          </Link>
           </div>
            </div>
          </div>
          </div>
          
)
}
    
    export default Modal;