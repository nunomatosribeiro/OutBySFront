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
import '../PageDetails.css'
import PageDetailsImages from '../components/PageDetailsImages'

export default function PageDetails() {
    const { postId } = useParams();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => { 
    fetchPostData()
  }, [])
const fetchPostData = async () => {
try {
    const response = await axios.get(`${apiBaseUrl}/posts/pagedetails/${postId}`)
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
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />
  }
  return (
    <div className='page-details-container'>
    
<div className='container1'>
    <section className='section1-gallery-page-details'>
      <PageDetailsImages posts={posts} /> 
    </section>
    <div className='container-pageDetails-price-text'>
    <div>
    <section className='section2-title-page-details'>
    <div className='title-page-details'>
    <h1> {posts.title}</h1>
    </div>
</section>

<section className='section3-description-page-details'>
    <div className='description-page-details'>
    <p> {posts.fullDescription}</p>
    </div>
</section>

<section className='section4-about-page-details'>
    <div className='info-page-details'>
    <h3>About this {posts.category === 'Tours' ? 'Tour' : posts.category}
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
    <h4>Includes</h4>
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

<section className='section6-reviews-page-details'>
<div>
    <h3>Reviews</h3>
    <div>{posts.reviews}</div>
</div>
</section>
</div>
<section className='section7-price-page-details'>
<div className='container-price'>
   <span> From</span>
<br/>€{posts.price} per person
<br/>

<p> Reserve now & pay later to book your spot and pay nothing today</p>
</div>
</section>
</div>
</div>
    </div>
  )
}
