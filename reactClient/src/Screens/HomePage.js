import React, { useEffect, useState } from 'react'

import { Typography, Row, Col, Card } from "antd";

import About from '../components/About';

const { Title } = Typography;


const HomePage = () => {

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };
  
    window.addEventListener('resize', handleResize);
    handleResize(); // Call it initially
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <div className='homePage'>
      <Col style={{ flex: 1 }}>
        <Title color="black" level={2} className="heading">
          Blood Types
        </Title>

        {/* Add a wrapper div for the cards */}
        <div className={`cardsWrapper${isMobileView ? ' mobileView' : ''}`}>
          <Row gutter={[12, 12]} className='cards'>
            <Col xs={12} sm={8} md={6} lg={6} xl={4}>
              <Card hoverable className='card'>
                A+
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={4}>
              <Card hoverable className='card'>
                O+
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={4}>
              <Card hoverable className='card'>
                B+
              </Card>
            </Col>
          </Row>
          <Row gutter={[12, 12]} className='cards'>
            <Col xs={12} sm={8} md={6} lg={6} xl={4}>
              <Card hoverable className='card'>
                AB+
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={4}>
              <Card hoverable className='card'>
                A-
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={4}>
              <Card hoverable className='card'>
                O-
              </Card>
            </Col>
          </Row>
          <Row gutter={[12, 12]} className='cards'>
            <Col xs={12} sm={8} md={6} lg={6} xl={4}>
              <Card hoverable className='card'>
                B-
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={4}>
              <Card hoverable className='card'>
                AB-
              </Card>
            </Col>
          </Row>
        </div>
      </Col>
      <About />
    </div>
  </>
  )
}

export default HomePage