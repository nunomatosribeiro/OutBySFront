import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { apiBaseUrl } from '../config'
import { useParams } from 'react-router-dom'
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck, 
    faCalendarDays, 
    faNoteSticky,
    faX, 
    faClock, 
    faLanguage
} from '@fortawesome/free-solid-svg-icons';
import "react-image-gallery/styles/css/image-gallery.css";
import '../Pagedetails.css'
import PageDetailsImages from '../components/PageDetailsImages'
import ReserveNow from '../components/ReserveNow'
import ReviewPage from '../components/Reviews'
import AvgReviewComponent from '../components/AvgReviews'

export default function PageDetails({ isOpen }) {
    const { postId } = useParams();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => { 
    fetchPostData()
  }, [])
const fetchPostData = async () => {
try {
    const token = localStorage.getItem("authToken");

      
    const response = await axios.get(`${apiBaseUrl}/posts/details/${postId}`, {
        headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const post = response.data;
    console.log('Ver aqui info dos detalhes do post', post);
    setPosts(post);
} catch (error) {
    console.log(error)
}
setIsLoading(false)
}


if (isLoading) {
    return <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
aria-label="three-dots-loading"
visible="true"
 />
  }
  return (
    <div className={isOpen ? "mainpage-container-blur" : 'page-details-container'}>
    
    <section className='section1-gallery-page-details'>
      <PageDetailsImages posts={posts} /> 
    </section>
    
    <section className='section2-title-page-details'>
    <div className='title-page-details'>
    <h1><strong> {posts.title}</strong></h1>
    <AvgReviewComponent />
    </div>
</section>

<section className='section3-description-page-details'>
    <div className='description-page-details'>
    <p> {posts.fullDescription}</p>
    </div>
</section>

<section className='section4-about-page-details'>
    <div className='info-page-details'>
    <h3><strong>About this {posts.category === 'Tours' ? 'Tour' : posts.category}</strong>
</h3>
    {posts.info.map((post, index)=>(
        <div key={index}>
        {post.duration && <p><FontAwesomeIcon icon={faClock} /> {post.duration}</p>}
       {post.language &&<p><FontAwesomeIcon icon={faLanguage} /> {post.language}</p>}
       {post.cancellation &&<p><FontAwesomeIcon icon={faCalendarDays} /> {post.cancellation}</p>}
       {post.other && <p><FontAwesomeIcon icon={faNoteSticky} /> {post.other}</p>}
        </div>
    ))}
    
    </div>
</section>

<section className='section5-included-page-details'>
    <div className='included-page-details'>
    <h4><strong>Includes</strong></h4>
    <div >
        {posts.included.map((includedItem, index)=>(
        <div key={index}>
        <ul>
        {includedItem.included && 
        <li>
        <FontAwesomeIcon icon={faCheck} style={{color: "#2c8825",}} />
        {includedItem.included}
        </li>}
        
        {includedItem.notIncluded &&
        <li>
        <FontAwesomeIcon icon={faX} style={{color: "#aa1313",}} />
        {includedItem.notIncluded}
        </li>}
        </ul>
        
        </div>
        ))}
        </div>
        
        </div>
</section>

<section className='section7-price-page-details'>
<div className='container-price'>
   <p> From</p>
€{posts.price} per person


<p> Reserve now & pay later to book your spot and pay nothing today</p>
</div>
<div className='container-form-magicButton'>
    <ReserveNow />
</div>
</section>


<section className='section6-reviews-page-details'>
<div className='container-ReviewPageComponent'>
    <h3>Reviews</h3>
    {/* <div>{posts.reviews}</div> */} {/* its throwing an error*/}
    <ReviewPage />
</div>
</section>

    </div>
  )
}
