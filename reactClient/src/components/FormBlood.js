import React, { useState } from "react";
import {
  Typography,
  Col,
  Input,
  Form,
  Select,
  Button,
  DatePicker,
} from "antd";
import axios from "axios";

const { Title } = Typography;
const { Option } = Select;

const FormBlood = () => {
  const [dName, setDName] = useState("");
  const [dAddress, setDAddress] = useState("");
  const [dBirthDay, setDBirthDay] = useState("");
  const [dId, setDiD] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [userEmail, setUserEmail] = useState("");

  

  const tnxMessage = `
  <h3 style="color: #ff0000;">Thank you ${dName} !</h3>

  <p style="font-size: 16px;">Your blood donation has been successfully saved in our blood bank system.</p>
  <img src="https://health.gov.tt/sites/default/files/styles/large/public/inline-images/Blood%20Bank%20logo%202022-03.png?itok=0H-a6QNb" alt="Blood Bank Image" width="200" height="120" >
  <p style="font-style: italic;">Regards, 'Blood Bank SCE'</p>


  `;

  // function add new donation to db
  const addDonateBlood = async (e) => {
    if (!dName || !dId || !bloodType || bloodType === "") {
      console.log("Something Wrong...");
      e.preventDefault();
    } else {
      // e.preventDefault();
      try {
        //add check exsit 
        // Check if the email or donor ID already exists in the donation documents
        const existingDonations = await axios.get("https://blood-bank-2023.onrender.com/api/donation");
        const existingEmails = existingDonations.data.filter((donation) => donation.email === userEmail);
        const existingDonorIDs = existingDonations.data.filter((donation) => donation.donorId === dId);

        if (existingEmails.length > 0 || existingDonorIDs.length > 0) {
          console.log("User cannot donate blood again until at least 3 months have passed since the last donation");
          alert('User cannot donate blood again until at least 3 months have passed since the last donation');
          return;
        }

        
        //finish cahnges

        const res = await axios.post("https://blood-bank-2023.onrender.com/api/donation", {
          name: dName,
          address: dAddress,
          birthDay: dBirthDay,
          donorId: dId,
          bloodType: bloodType,
          email: userEmail,
        });

        const testInformation =
          "Action : Donate | " +
          "Name: " +
          dName +
          " | " +
          " Address: " +
          dAddress +
          " | " +
          "BirthDay: " +
          dBirthDay +
          " | " +
          "Donor Id: " +
          dId +
          " | " +
          "Blood Type: " +
          bloodType +
          " | " +
          "Date: " +
          new Date().toDateString();

        await axios.post("https://blood-bank-2023.onrender.com/api/logInfo", {
          info: testInformation,
          email: userEmail,
          bdDate: new Date().toDateString(),
        });

        console.log(res);
        console.log("Donate Info : " + testInformation);

        await axios.post("https://blood-bank-2023.onrender.com/api/sendMail", {
          email: userEmail,
          emailMessage: tnxMessage,
        });

        return alert(
          "Success. Thank you !    " +
            res.config.data +
            "Date:" +
            new Date().toDateString()
        );

        // e.preventDefault();
      } catch (error) {
        console.log(error);

        return alert("Something went wrong...  Please try again later.    ");
      }
    }
  };

  //function get all donation from db

  return (
    <div className="formContainer">
      <Title level={2} className="heading">
        Donation Details
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
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 300,
          }}
        >
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
            className="formItem"
            label={<p style={{ fontSize: "18px" }}>Address</p>}
            name="address"
            rules={[
              {
                required: true,
                message: "Please Enter The Address!",
              },
            ]}
          >
            <Input
              onChange={(e) => setDAddress(e.target.value)}
              value={dAddress}
            />
          </Form.Item>
          <Form.Item
            className="formItem"
            label={
              <p
                style={{ fontSize: "18px", marginRight: 12, paddingRight: 12 }}
              >
                Birth Day{" "}
              </p>
            }
            name="birthDay"
            rules={[
              {
                required: true,
                message: "Please Enter The Birth Day!",
              },
            ]}
          >
            <DatePicker
              onChange={(date, dateString) => setDBirthDay(dateString)}
              value={dBirthDay}
            />
            {/* <Input  onChange={(e) => setDBirthDay(e.target.value)} value={dBirthDay} /> */}
          </Form.Item>
          <Form.Item
            label={
              <p
                style={{ fontSize: "18px", marginRight: 12, paddingRight: 12 }}
              >
                ID
              </p>
            }
            name="userId"
            rules={[
              {
                required: true,
                message: "Please input The ID!",
              },
            ]}
          >
            <Input onChange={(e) => setDiD(e.target.value)} value={dId} />
          </Form.Item>
          <Form.Item
            label={
              <p
                style={{ fontSize: "18px", marginRight: 12, paddingRight: 12 }}
              >
                Email
              </p>
            }
            name="userEmail"
            rules={[
              {
                required: true,
                message: "Please input The Email!",
              },
            ]}
          >
            <Input
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
            />
          </Form.Item>
          <Form.Item
            name="Blood Type"
            label={
              <p
                style={{ fontSize: "18px", marginRight: 12, paddingRight: 12 }}
              >
                Blood Type
              </p>
            }
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select Blood Type"
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
