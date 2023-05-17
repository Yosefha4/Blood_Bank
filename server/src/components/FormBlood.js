import React, { useEffect, useState } from "react";
import { Typography, Col, Input, Form, Select, Button, Alert } from "antd";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

const FormBlood = () => {
  const [dName, setDName] = useState("");
  const [dId, setDiD] = useState("");
  const [bloodType, setBloodType] = useState("");

  // function add new donation to db
  const addDonateBlood = async (e) => {
    if (!dName || !dId || !bloodType || bloodType === "") {
      console.log("Something Wrong...");
      e.preventDefault();
    } else {
      // e.preventDefault();
      try {
        const res = await axios.post("http://localhost:5500/api/donation", {
          name: dName,
          donorId: dId,
          bloodType: bloodType,
        });

        console.log(res);
        return alert(
          "Success. Thank you !    " +
            res.config.data +
            "Date:"+
              new Date().toDateString()
        );
        // {<Alert
        //   message="Success Text"
        //   description="Success Description Success Description Success Description"
        //   type="success"
        // />}
        // { res && <Alert message="Thank You !" closable />}
        e.preventDefault();
      } catch (error) {
        console.log(error);
  
        return alert("Something went wrong...  Please try again later.    ")
      }
      // if(res){
      //       <Alert
      //       message="Success Text"
      //       description="Success Description Success Description Success Description"
      //       type="success"
      //     />
      // }
    }
  };

  //function get all donation from db

  return (
    <div className="formContainer">
      <Title level={2} className="heading">
        Want to donate blood?
      </Title>

      <Form
        //   onSubmit={e=> addDonateBlood(e)}
        size="large"
        className="bloodForm"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 24,
        }}
      >
        <Col style={{ display: "grid" }}>
          <Form.Item
            className="formItem"
            label={<p style={{ fontSize: "18px" }}>Full Name</p>}
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your Full Name!",
              },
            ]}
          >
            <Input onChange={(e) => setDName(e.target.value)} value={dName} />
          </Form.Item>
          <Form.Item
            label={<p style={{ fontSize: "18px" }}>ID</p>}
            name="userId"
            rules={[
              {
                required: true,
                message: "Please input your ID!",
              },
            ]}
          >
            <Input onChange={(e) => setDiD(e.target.value)} value={dId} />
          </Form.Item>
          <Form.Item
            name="Blood Type"
            label={<p style={{ fontSize: "18px" }}>Blood Type</p>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select Your Blood Type"
              onSelect={(value) => setBloodType(value)}
              //   onChange={e => console.log(e.target.value)}
              //   onChange={e => setBloodType(e.tagert.value)}

              allowClear
            >
              <Option value="">Select</Option>
              <Option value="A+">A+</Option>
              <Option value="O+">O+</Option>
              <Option value="B+">B+</Option>
              <Option value="AB+">AB+</Option>
              <Option value="A-">A-</Option>
              <Option value="O-">O-</Option>
              <Option value="B-">B-</Option>
              <Option value="AB-">AB-</Option>
            </Select>
          </Form.Item>
          <Button
            style={{
              marginTop: 24,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              backgroundColor: "whitesmoke",
              fontWeight: "bold",
            }}
            onClick={(e) => addDonateBlood(e)}
          >
            Submit
          </Button>
        </Col>
      </Form>
    </div>
  );
};

export default FormBlood;
