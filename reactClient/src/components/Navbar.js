import React, { useState } from "react";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Navbar = () => {
  const navRef = useRef();

  const [currentName,setCurrentName] = useState("")

  const [cookies, setCookies] = useCookies(["access_token"]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/");
  };

  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const getUserName = async () =>{
    if(cookies){
      // console.log(window.localStorage.getItem("userID"))
      const currentUserID = window.localStorage.getItem("userID");

      try {
        const temp = await axios.get(`https://blood-bank-2023.onrender.com/api/getUser/${currentUserID}`);
        // console.log("temp" , temp.data.currUser.fullName)
        setCurrentName(temp.data.currUser.fullName);
        
      } catch (error) {
        console.log(error)
      }

    }
  }

  getUserName();

  return (
    <header>
      <h3>Blood Bank</h3>


      <nav ref={navRef}>
        <a href="/home">Home</a>
        <a href="/donateblood">Donate</a>
        <a href="/getblood">Get</a>
        <a href="/stock">More</a>
        <a href="/logInfo">Export</a>
        {!cookies.access_token ? (
          <a href="/">Login/Register</a>
        ) : (
          <>
          <button
            style={{
              fontWeight: "bold",
              backgroundColor: isHovered ? "aquamarine" : "transparent",
              borderColor: "transparent",
              fontSize: 22,
              color: isHovered ? "black" : "lightblue",
              marginLeft:18
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={logout}
          >
            LogOut
          </button>
          <a style={{border:'none', color:'white', textShadow:'2px 2px black', fontWeight:'bold'}} >
          Hello : {currentName} - ({window.localStorage.getItem("userType")})
          </a>
          </>
          
        )}

          
        <button className="navBtn nav-close-btn" onClick={showNavBar}>
          <FaTimes />
        </button>
      </nav>
      <button className="navBtn" onClick={showNavBar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Navbar;
