import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import CardDetails from '../components/CardDetails'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../config';


/* const tem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  })); */
/*   const images = [
    {src: 'porto-image.jpg', alt: 'Porto image'},
    {src: 'porto-cheeseboardImage.jpg', alt: 'Porto image'},
    {src: 'porto-activities.jpg', alt: 'Porto image'},
    {src: 'porto-activities.jpg', alt: 'Porto image'},
    {src: 'porto-activities.jpg', alt: 'Porto image'},
    {src: 'porto-activities.jpg', alt: 'Porto image'},
  ] */

const ToursPage = ({ isOpen }) => {
  

  
      return ( 
    <div className={isOpen ? "mainpage-container-blur" :''}>
    <h1></h1>
    </div>
     );
}
 
export default ToursPage;

