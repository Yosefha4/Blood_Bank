import React from 'react'

import { Typography, Row, Col, Statistic, Image, Card } from "antd";

import LogoIcon from '../assets/bbLogo.png'
import About from '../components/About';

const { Title } = Typography;


const HomePage = () => {
  return (
    <>
    <div className='homePage'>
    <Col style={{flex:1}}>
      <Title  color="black" level={2} className="heading">
        Blood Types
      </Title>

      <Row gutter={12} className='cards'>
    <Col span={4}>
      <Card hoverable className='card'   >
        A+
       
      </Card>
    </Col>
    <Col span={4}>
      <Card hoverable className='card' >
        O+
      </Card>
    </Col>
    <Col span={4}>
      <Card hoverable className='card' >
        B+
      </Card>
    </Col>
  </Row>
      <Row gutter={12} className='cards'>
    <Col span={4}>
      <Card hoverable className='card' >
        AB+
      </Card>
    </Col>
    <Col span={4}>
      <Card hoverable className='card' >
        A-
      </Card>
    </Col>
    <Col span={4}>
      <Card hoverable className='card' >
        O-
      </Card>
    </Col>
  </Row>
      <Row gutter={12} className='cards'>
    <Col span={4}>
      <Card hoverable className='card' >
        B-
      </Card>
    </Col>
    <Col span={4}>
      <Card hoverable className='card' >
        AB-
      </Card>
    </Col>
    
  </Row>
     
      </Col>
      <About />
      </div>
    </>
  )
}

export default HomePage