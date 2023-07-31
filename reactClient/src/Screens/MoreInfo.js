import React from 'react'
import About from '../components/About'

import BackBcg from '../assets/bgBlood.jpg';
import { Carousel } from 'antd';

const MoreInfo = () => {
  return (
    <div style={{
        paddingTop:48
    }}>

<div className='container'>
    <p style={{fontSize:36, fontWeight:'bold'}}>External Links</p>
    <div className='circleContainer'>
        <div className='circleItem' >
            {/* <p style={{fontWeight:'bold',fontSize:24}}>Why Donate ?</p> */}
            <a href='https://www.medicalnewstoday.com/articles/319366'  target="_blank" rel="noopener noreferrer" style={{fontWeight:'bold',fontSize:20,textDecoration:'none',color:'black'}} >Why Donate?</a>
            {/* <img src='reactClient\src\assets\b.png' width={250} height={250}/> */}
        </div>
        <div className='circleItem' >
            {/* <p style={{fontWeight:'bold',fontSize:24}}>Why Donate ?</p> */}
            <a href='https://www.mdais.org/en'  target="_blank" rel="noopener noreferrer" style={{fontWeight:'bold',fontSize:20,textDecoration:'none',color:'black'}} >MDA Israel</a>
            {/* <img src='reactClient\src\assets\b.png' width={250} height={250}/> */}
        </div>
        <div className='circleItem' >
            {/* <p style={{fontWeight:'bold',fontSize:24}}>Why Donate ?</p> */}
            <a href='https://www.dam.org.il/en/'  target="_blank" rel="noopener noreferrer" style={{fontWeight:'bold',fontSize:20,textDecoration:'none',color:'black'}} >Blood Donors Israel</a>
            {/* <img src='reactClient\src\assets\b.png' width={250} height={250}/> */}
        </div>
        <div className='circleItem' >
            {/* <p style={{fontWeight:'bold',fontSize:24}}>Why Donate ?</p> */}
            <a href='https://healthmatters.nyp.org/the-surprising-benefits-of-donating-blood/'  target="_blank" rel="noopener noreferrer" style={{fontWeight:'bold',fontSize:20,textDecoration:'none',color:'black'}} >Donate Benefits</a>
            {/* <img src='reactClient\src\assets\b.png' width={250} height={250}/> */}
        </div>
    </div>
</div>

        {/* <p>More Info</p> */}
        <About />

    </div>
  )
}

export default MoreInfo