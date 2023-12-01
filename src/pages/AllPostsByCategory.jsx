import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiBaseUrl } from '../config'
import { useParams } from 'react-router-dom'
import CardDetails from '../components/CardDetails'
import '../AllPostsByCategory.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const AllPostsByCategory = () => {
  const [posts, setPosts] = useState([])
 const { category } = useParams()

  useEffect(() => { 
    fetchPostsByCategory()
  }, [category])
  
    const fetchPostsByCategory = async () => {
      try {
      
        const response = await axios.get(`${apiBaseUrl}/posts/${category}`)
        const postsWithImageData = await Promise.all(
          response.data.map(async (post) => {
            if (post.imageData && post.public_id) {
              // Construct the Cloudinary URL for each post
              const cloudinaryUrl = `https://res.cloudinary.com/du6zxcbrm/image/upload/v1699357162/${post.public_id}`;
              return { ...post, cloudinaryUrl };
            } else {
              // If imageData is not available, return the post as is
              return post;
            }
          })
        );

        setPosts(postsWithImageData)
        console.log('DATA BY CATEGORY', postsWithImageData)
      } catch (error) {
        console.log('Error fetching posts by category', error)
      }
    }

   


  return (
    <div>
        <section id="tours-section01">
<div className="hero-Image-tours">

</div>
</section>

<section id='tours-section02'>
<h1>Check here your {category}</h1>
    <CardDetails posts={posts} category={category} />
   </section>
    </div>
    
    
   
  )
}

export default AllPostsByCategory

