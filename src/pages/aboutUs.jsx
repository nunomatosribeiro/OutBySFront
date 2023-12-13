import React from 'react'
import '../AboutUs.css'
export default function AboutUs() {

  return (
    <div className='aboutus-full-page-container'>
    <section id="section01">            
<div className="hero-Image">
<div className="hero-Text">
     
<h1>Know a bit more about us</h1>
</div>
</div>
</section>
    <section className='section02-aboutUsPage'>
        <div className='aboutus-container'>
          <div className='aboutus-page-travel-experience'>
            <h3>Unique travel experiences</h3>
<p>Think where you want to go, we decide the rest.<br/>
 Make memories all over the globe.<br/></p>
 <img src='/aerial-view-famous-bridge-porto-portugal.jpg' alt='Ponte bridge Porto Portugal' />
 </div>
 <div className='aboutus-page-maximize-trip'>
 <h3>Maximize your trip</h3>
 <div className='text-container-maximize-trip'>
<p>Did you ever went on a trip and thought, "I didn't enjoy to the fullest..."?</p>
<p>We will make sure you don't feel that way. Also, no need to stress about your trip planning.</p>
<p>Talk with us and let us do the job, so you can focus on enjoying the moment, not taking care of logistics.</p>
</div>
<img src='/background-photo2.jpg' alt='Porto Portugal' />

</div>
<div className='aboutus-page-best-sights'>
<h3>Find the best sights</h3>
<p>With us you can find plenty of activities, tours, gastro tours and tailormade experiences.
  We will make sure you don't lose any surprise.<br/></p>
  <img src='/douro-valley-vineyards.jpg' alt='Douro Valley Vineyards Porto Portugal' />

  </div>
  <div className='aboutus-page-delicious-foods'>
       <h3 style={{}}>Delicious food</h3>
       <p>Known for it's gastronomy, Porto as a lot to offer.<br/>
       Our partners are selected carefully so you can have an authentic experience and service.<br/>
       We love the city and we want to make sure you feel the same when you leave </p>
       <div className='aboutus-page-delicious-foods-img'>
<img src='/5615428.jpg' alt='sardines sardinhas são joão Porto Portugal' />
<img src='/porto-francesinhaImage.jpg' alt='sardines sardinhas são joão Porto Portugal' />
</div></div>

        </div>
</section>
</div>
  )
}
