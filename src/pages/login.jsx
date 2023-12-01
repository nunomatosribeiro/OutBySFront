import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
/* import ClipLoader from "react-spinners/ClipLoader"; */
import axios from "axios";
import { apiBaseUrl } from "../config";
import '../Login.css';

const Login = ( { showModal } ) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const { authenticateUser } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState(null)
    const nav = useNavigate()

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

      nav(`/`)
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    
  }

/*   if (isLoading){
    return <ClipLoader
    className="cliploader"
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  } */

    return ( 
      <div onClick={() => !showModal ? ( /* className={`${!isClicked ? "active" : ""} show`} */
        <div className="login-form">
       {<div className="form-box solid">
      
            <form onSubmit={handleLogin}>
        
          <input
          className="inputStyle"
            type='email'
            value={email}
            required
            onChange={event => {
              setEmail(event.target.value)
            }}
            placeholder='Email'
          />
   
        
          <input
         className="inputStyle"
            type='password'
            value={password}
            required
            onChange={event => {
              setPassword(event.target.value)
            }}
            placeholder='Password'
          />
        
        <div className="buttonContainer">
        <button className="buttonStyle" type='submit'>Login</button>
        </div>
      </form>
     
      {errorMessage ? <p>{errorMessage}</p> : null}
      </div>}
   {/*    <hr className="line"/>
      <div className="imageContainer">
      <img className="loginImage" src='../images/section3Image2.webp' alt='loginImage' /> */}
      </div>
        
      )
         : null }
        /* </div> */></div>
     );
}
 
export default Login;

