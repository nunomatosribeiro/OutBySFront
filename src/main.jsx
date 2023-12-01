import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextWrapper } from './context/Auth.context.jsx'
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="1080037962790-pdqotlk2o8qive3dtik9k94fkqoqcdu5.apps.googleusercontent.com">
  <React.StrictMode>
  <BrowserRouter>
  <AuthContextWrapper>
    <App />
    </AuthContextWrapper>
  </BrowserRouter>
</React.StrictMode>
</GoogleOAuthProvider>,
)
