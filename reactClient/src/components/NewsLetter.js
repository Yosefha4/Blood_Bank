import { Alert, Button, Col, Form, Input, Layout, Row, Space } from "antd";
import React, { useState } from "react";

import BgImage from "../assets/bgBlood.jpg";
import axios from "axios";

const newsMessage =  `
<h3 style="color: #ff0000;">Thank you  !</h3>

<p style="font-size: 16px;">We are excited to add you to our "Blood Bank" family :) 
We received your email address, and it was successfully saved in the system!</p>
<img src="https://health.gov.tt/sites/default/files/styles/large/public/inline-images/Blood%20Bank%20logo%202022-03.png?itok=0H-a6QNb" alt="Blood Bank Image" width="200" height="120" >
<p style="font-style: italic;">Regards, 'Blood Bank '</p>


`;

const NewsLetter = () => {
  const [userEmail, setuserEmail] = useState("");


  const handleNewsLetter = async () => {
    console.log("Start Handle !");

    try {
      const res = await axios.post("http://localhost:5500/api/newsLetter", {
        userEmail: userEmail,
      });
      console.log(res.status);

      if (res.status === 201) {
        console.log("Your email already exist");
        alert("Your email already exist.");
        return;
      } else if (res.status === 200) {
        console.log("The NewsLetter Email Add Success !");

        await axios.post("https://blood-bank-2023.onrender.com/api/sendMail", {
          email: userEmail,
          emailMessage: newsMessage,
        });

        alert("We Got Your Email, Thank You !");
        return;

      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        flexDirection: "column",
        padding: 36,
        margin: 24,
        height: "100vh",
      }}
    >
      <p style={{ fontSize: "50px", color: "white", fontWeight: "bolder" }}>
        Join Us - For News
      </p>
      <Form
        className="bloodForm"
        style={{
          width: 1000,
          height: 650,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "transparent",
          boxShadow: "0 0 18px whitesmoke",
        }}
      >
        <Col
          style={{
            display: "flex",
            width: 650,
            height: 350,
            flexDirection: "column",
            gap: "24px",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid white",
            padding: 24,
            boxShadow: "0 0 18px black",
            backgroundColor: "white",
          
            borderRadius: "6px",
          }}
        >
          {/* <Row style={{display:'flex',flexDirection:'row',alignItems:"center", justifyContent:'space-between'}}> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "white",
                // border: null,
                borderRadius: "5px",
                padding: 6,
                color: "black",
                // boxShadow: "0 0 8px black",
              }}
            >
              Email:
            </p>
            <Input
              name="userEmail"
              value={userEmail}
              onChange={(e) => setuserEmail(e.target.value)}
              placeholder="Enter Your Email"
              aria-label="Email"
              style={{
                fontSize: "18px",
                border: "1px solid black",
                fontWeight: "bold",
              }}
            />
          </div>
          {/* </Row> */}
          <Button
            style={{
              width: "250px",
              fontSize: "18px",
              fontWeight: "bold",
              paddingBottom: 34,
              boxShadow: "0 0 6px black",
            }}
            onSubmit={handleNewsLetter}
            onClick={handleNewsLetter}
          >
            Send
          </Button>
        </Col>
      </Form>
    </div>
  );
};

export default NewsLetter;
