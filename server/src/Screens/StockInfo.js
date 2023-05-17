import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Statistic, Image, Card } from "antd";

import { BsCircle } from "react-icons/bs";
import axios from "axios";

const { Title } = Typography;

const StockInfo = () => {
  const [bloodInStock, setBloodInStock] = useState([]);

  useEffect(() => {
    const getAllDonation = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/donation");
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
  // console.log(`The Number of 'AB+' blood doses: ${ABplus}`)
  // console.log(`The Number of 'AB-' blood doses: ${ABminus}`)
  // console.log(`The Number of 'A+' blood doses: ${Aplus}`)
  // console.log(`The Number of 'B+' blood doses: ${Bplus}`)
  // console.log(`The Number of 'A-' blood doses: ${Aminus}`)
  // console.log(`The Number of 'B-' blood doses: ${Bminus}`)
  // console.log(`The Number of 'O+' blood doses: ${Oplus}`)
  // console.log(`The Number of 'O-' blood doses: ${Ominus}`)

  return (
    <div>
      <Col style={{ flex: 1 }}>
        <Title color="black" level={2} className="heading">
          In Stock
        </Title>

        <Row gutter={12} className="cards">
          <Col span={4}>
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
          <Col span={4}>
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
          <Col span={4}>
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
        <Row gutter={12} className="cards">
          <Col span={4}>
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
          <Col span={4}>
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
          <Col span={4}>
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
        <Row gutter={12} className="cards">
          <Col span={4}>
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
          <Col span={4}>
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
