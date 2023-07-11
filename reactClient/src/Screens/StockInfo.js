import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Card } from "antd";

import axios from "axios";

const { Title } = Typography;

const StockInfo = () => {
  const [bloodInStock, setBloodInStock] = useState([]);
  
  useEffect(() => {
    const getAllDonation = async () => {
      try {
        const res = await axios.get("https://blood-bank-2023.onrender.com/api/donation");
        // console.log(res)
        setBloodInStock(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllDonation();
  }, []);

  // console.log(bloodInStock)

  const ABplus = bloodInStock.filter((item) => item.bloodType === "AB+").length;
  const ABminus = bloodInStock.filter(
    (item) => item.bloodType === "AB-"
  ).length;
  const Aplus = bloodInStock.filter((item) => item.bloodType === "A+").length;
  const Bplus = bloodInStock.filter((item) => item.bloodType === "B+").length;
  const Aminus = bloodInStock.filter((item) => item.bloodType === "A-").length;
  const Bminus = bloodInStock.filter((item) => item.bloodType === "B-").length;
  const Oplus = bloodInStock.filter((item) => item.bloodType === "O+").length;
  const Ominus = bloodInStock.filter((item) => item.bloodType === "O-").length;

  // const Aplus = ((bloodInStock.filter((item) => item.bloodType === "A+")).filter((item)=> item.isExpired !== true)).length
  // const Bplus = ((bloodInStock.filter((item) => item.bloodType === "B+")).filter((item)=> item.isExpired !== true)).length


  return (
    <div>
      <Col style={{ flex: 1 }}>
        <Title color="black" level={2} className="heading">
          In Stock
        </Title>

        <Row gutter={[12, 12]} className='cards'>
        <Col xs={12} sm={8} md={6} lg={6} xl={4}>
            <Card
              hoverable
              className="stockCard"
              title={
                <Title
                  style={{ color: "black", textShadow: "1px 1px  white" }}
                  level={2}
                >
                  A+
                </Title>
              }
            >
              <p style={{ textShadow: "2px 2px 1px black" }}>{Aplus}</p>
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={6} xl={4}>
            <Card
              hoverable
              className="stockCard"
              title={
                <Title
                  style={{ color: "black", textShadow: "1px 1px  white" }}
                  level={2}
                >
                  O+
                </Title>
              }
            >
              <p style={{ textShadow: "2px 2px 1px black" }}>{Oplus}</p>
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={6} xl={4}>
            <Card
              hoverable
              className="stockCard"
              title={
                <Title
                  style={{ color: "black", textShadow: "1px 1px  white" }}
                  level={2}
                >
                  B+
                </Title>
              }
            >
              <p style={{ textShadow: "2px 2px 1px black" }}>{Bplus}</p>
            </Card>
          </Col>
        </Row>
        <Row gutter={[12, 12]} className='cards'>
        <Col xs={12} sm={8} md={6} lg={6} xl={4}>
            <Card
              hoverable
              className="stockCard"
              title={
                <Title
                  style={{ color: "black", textShadow: "1px 1px  white" }}
                  level={2}
                >
                  AB+
                </Title>
              }
            >
              <p style={{ textShadow: "2px 2px 1px black" }}>{ABplus}</p>
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={6} xl={4}>
            <Card
              hoverable
              className="stockCard"
              title={
                <Title
                  style={{ color: "black", textShadow: "1px 1px  white" }}
                  level={2}
                >
                  A-
                </Title>
              }
            >
              <p style={{ textShadow: "2px 2px 1px black" }}>{Aminus}</p>
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={6} xl={4}>
            <Card
              hoverable
              className="stockCard"
              title={
                <Title
                  style={{ color: "black", textShadow: "1px 1px  white" }}
                  level={2}
                >
                  O-
                </Title>
              }
            >
              <p style={{ textShadow: "2px 2px 1px black" }}>{Ominus}</p>
            </Card>
          </Col>
        </Row>
        <Row gutter={[12, 12]} className='cards'>
        <Col xs={12} sm={8} md={6} lg={6} xl={4}>
            <Card
              hoverable
              className="stockCard"
              title={
                <Title
                  style={{ color: "black", textShadow: "1px 1px  white" }}
                  level={2}
                >
                  B-
                </Title>
              }
            >
              <p style={{ textShadow: "2px 2px 1px black" }}>{Bminus}</p>
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={6} xl={4}>
            <Card
              hoverable
              className="stockCard"
              title={
                <Title
                  style={{ color: "black", textShadow: "1px 1px  white" }}
                  level={2}
                >
                  AB-
                </Title>
              }
            >
              <p style={{ textShadow: "2px 2px 1px black" }}>{ABminus}</p>
            </Card>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default StockInfo;
