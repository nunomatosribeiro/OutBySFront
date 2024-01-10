import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../config";
/* import CloudinaryUpload from "../components/CloudinaryUpload"; */
import { AuthContext } from "../context/Auth.context";
import '../signup.css'
import '../App.css'

const Signup = () => {
  const [name, setName] = useState("");
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${apiBaseUrl}/auth/signup`,
        { name, email, password, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Set the content type as needed
            // Add any other headers if required
          },
        }
      );
  
      setName("");
      setEmail("");
      setPassword("");
      // setImage(""); 
  
      console.log("Here is the signup response", res.data);
      nav("/");
    } catch (error) {
      console.error("Signup Error:", error.response?.data, error.response?.status, error.response?.headers);

      // Add the following line to log the entire error.response object
      console.log("Full error response:", error.response);
      console.error("Signup Error:", error.response?.data, error);
    }
  };

  const titleStyle = {
    position: "absolute",
    fontSize: "60px",
      fontWeight: "bold",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      textAlign: "center",
      color: 'white',
  }

 
  
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: "400px",
    padding: "20px",
   
    borderRadius: "7px",
    backgroundColor: 'white',
    opacity: '0.95',


  };


    return (
        <div className="signUp-page-container">
      <div className="image-signupPage-container">
        <img src='./signupImage.jpg' />
      </div>
      <div className="form-container-signup">
      <form onSubmit={handleSignup} style={formStyle}>
      <div className="label-container">
      <label htmlFor="username">Name</label>
      <input
        
          type="text"
          value={name}
          required
          onChange={(event) => {
            setName(event.target.value);
          }}
          
        />
      {/* <input
        
          type="text"
          value={username}
          required
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          
        /> */}
        
        <label htmlFor="email">Email</label>
       
        <input
         
          type="email"
          value={email}
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
        />
        
        <label htmlFor="password">Password</label>
        
        <input
          type="password"
          value={password}
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          
        />
        </div>
        {/* <CloudinaryUpload allowMultiple={false} initialMedia={[]} /> */}
        <button type="submit">
          Signup
        </button>
      </form>
        </div>
        </div>
    )
}
export default Signup;