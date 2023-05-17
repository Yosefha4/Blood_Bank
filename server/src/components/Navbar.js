import React from 'react'
import { useRef } from 'react'
import {FaBars,FaTimes } from 'react-icons/fa'
import LogoIcon from '../assets/bbLogo.png'

const Navbar = () => {

  const navRef = useRef();

  const showNavBar = () =>{
    navRef.current.classList.toggle("responsive_nav");
  }
  return (
    <header>
      <h3>Blood Bank</h3>
    
      <nav ref={navRef}>
        <a href='/'>Home</a>
        <a href='/donateblood'>Donate</a>
        <a href='/getblood'>Get</a>
        <a href='/stock'>More</a>
        <button className='navBtn nav-close-btn' onClick={showNavBar}><FaTimes /></button>
      </nav>
      <button className='navBtn' onClick={showNavBar} ><FaBars /></button>

    </header>
  )
}

export default Navbar