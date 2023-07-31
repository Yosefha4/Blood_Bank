import React, { useEffect, useState } from "react";

import { Typography, Row, Col, Card, Image, Slider, Carousel, Input } from "antd";

import About from "../components/About";
import person from "../assets/b.png";
import heart from "../assets/a.png";
import cImage from "../assets/c.png";
import { Link } from "react-router-dom";
// import tryImage from "../assets/b.png";

const { Title } = Typography;

const HomePage = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  const uType = localStorage.getItem("userType");

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it initially

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="homePage">
      <Row
        className="row-home"
      >
        <div>
          <Row
           className="firstCard"
          >
            {uType === "Donor" ? <Col
             className="firstCol"
            >
              <Row
                style={{
                  fontSize: "65px",
                  fontFamily: "Gill Sans Extrabold",

                  color: "#A91101",
                  textShadow: "2px 2px 2px white",

               
                }}
              >
                Donate Blood, Save Lives
              </Row>
              <Row
                style={{
                  fontSize: "70px",
                  fontFamily: "Gill Sans Extrabold",
                  color: "#A91101",
                  textShadow: "1px 1px 1px #000, 3px 3px 5px white",
                  marginTop: 24,
                }}
              >
                Be a Hero Today!
              </Row>
              <Row>
                <Link to='/diary'>
                <button className="homePage-btn">Donate</button>
                </Link>
              </Row>
            </Col> : <Col
             className="firstCol"
            >
              <Row
                style={{
                  fontSize: "65px",
                  fontFamily: "Gill Sans Extrabold",

                  color: "#A91101",
                  textShadow: "2px 2px 2px white",

               
                }}
              >
                Donate Blood, Save Lives
              </Row>
              <Row
                style={{
                  fontSize: "70px",
                  fontFamily: "Gill Sans Extrabold",
                  color: "#A91101",
                  textShadow: "1px 1px 1px #000, 3px 3px 5px white",
                  marginTop: 24,
                }}
              >
                Be a Hero Today!
              </Row>
              <Row>
                <Link to='/donateblood'>
                <button className="homePage-btn">Go</button>
                </Link>
              </Row>
            </Col>}
            <Col style={{ flex: 3 }}>
              {/* <Image src={tryImage} width={400}/> */}
              <img src={heart} width={500} className="heartImage" />
            </Col>
          </Row>
        </div>
      </Row>
      <Row
        style={{
          display: "flex",
          // flexDirection:'column'
          alignItems: "center",
          justifyContent: "space-around",
          // backgroundColor: "#A91101",
          boxSizing: "border-box",
          padding: 24,
          // width: "90%",
          // boxShadow: "0 0 5px white",

          height: "80vh",
          // width: "99%",
          marginTop: 36,
          borderRadius: "5px",
        }}
      >
        {/* <Title color="black" level={2} className="heading">
         
        </Title> */}

        {/* Add a wrapper div for the cards */}
        {/* <div className={`cardsWrapper${isMobileView ? ' mobileView' : ''}`}> */}
        <div>
          <Row
          className="secondCard"
          >
             <Col style={{ flex: 2 }}>
              {/* <Image src={tryImage} width={400}/> */}
              <img src={person} width={500} />
            </Col>
            <Col
              style={{
                flex: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Row
                     className="textCard"
              >
                Community for Life
              </Row>
              <Row
          className="textCard"
              >
                Join Our Blood Donor Family.
              </Row>
              <Row>

              <Row>
               
                <Link to='/news'>
                <button className="homePage-btn">Join Us</button>
                {/* <button style={{backgroundColor:'transparent',fontWeight:'bold',color:'white',paddingInline:24,paddingBlock:2,marginTop:18,borderRadius:'5px',border:'3px solid white',fontSize:24, cursor:'pointer',width:200}}>Join Us</button> */}
                </Link>
              </Row>
              </Row>
            </Col>
           
          </Row>
        </div>
      </Row>
{/* 
      <About /> */}
    
        
    </div>
  );
};

export default HomePage;
