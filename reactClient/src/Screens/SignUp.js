import React, { useEffect, useState } from "react";
import { Typography, Col, Form, Input, Radio, Button } from "antd";
import axios from "axios";
import { useNavigate  } from "react-router-dom";


const { Title } = Typography;

const SignUp = () => {
    // const history = useHistory();
    const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState("");



  const signUpHandler = async (e) => {
    if (!fullName || !emailInput || !userPassword || !userType) {
      console.log("Something Wrong...");
    //   e.preventDefault();
    } else {
      try {
        const res = await axios.post("http://localhost:5500/api/register", {
          fullName: fullName,
          email: emailInput,
          password: userPassword,
          userType: userType,
        });

        const signUpInfo =  "Action : CreateUser | " +  "Name: " + fullName + " | " + "Email: " + emailInput + " | " + "Password: " + userPassword + " | " + "userType" + userType

        // await axios.post("http://localhost:5500/api/logInfo", {
        //   info: testInformation,
        // });

        console.log(res);
        console.log("SignUp Details : " + signUpInfo);
        // navigate("/")
         alert(
          "Success. Thank you !    " +
            res.config.data +
            "Date:" +
            new Date().toDateString()
        );
        return navigate("/login")
       
     
        // e.preventDefault();
      } catch (error) {
        console.log(error);

        return alert("Something went wrong...  Please try again later.    ");
      }

    }
  };

  return (
    <div className="donated">
      <div className="authContainer">
        <Title color="black" level={2} className="heading">
          Sign Up
        </Title>

        <Form
          size="large"
          className="bloodForm"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
            marginTop: 16,
            //   backgroundColor:'black'
          }}
          autoComplete="off"
        >
          <Col>
            <Form.Item
              className="formItem"
              label={
                <p style={{ fontSize: "18px", width: 100, fontWeight: "bold" }}>
                  Full Name
                </p>
              }
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your Full Name!",
                },
              ]}
            >
              <Input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
            </Form.Item>
            <Form.Item
              className="formItem"
              label={
                <p style={{ fontSize: "18px", width: 100, fontWeight: "bold" }}>
                  Email
                </p>
              }
              name="userEmail"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                onChange={(e) => setEmailInput(e.target.value)}
                value={emailInput}
              />
            </Form.Item>
            <Form.Item
              className="formItem"
              label={
                <p style={{ fontSize: "18px", width: 100, fontWeight: "bold" }}>
                  Password
                </p>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input valid password!",
                },
              ]}
            >
              <Input
                onChange={(e) => setUserPassword(e.target.value)}
                value={userType}
              />
            </Form.Item>
            <Form.Item
              className="formItem"
              label={
                <p style={{ fontSize: "18px", width: 100, fontWeight: "bold" }}>
                  User Type
                </p>
              }
              name="userType"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Radio.Group
                onChange={(e) => setUserType(e.target.value)}
                style={{ marginRight: 36 }}
              >
                <Radio style={{ fontSize: 16 }} value={"Student"}>
                  Student
                </Radio>
                <Radio style={{ fontSize: 16 }} value={"Employee"}>
                  Employee
                </Radio>
              </Radio.Group>
              {/* <Input
              onChange={(e) => setUserPassword(e.target.value)}
              value={userPassword}
            /> */}
            </Form.Item>
            <Col style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Button
              style={{
                marginTop: 24,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor:'transparent',
                // fontWeight: "bold",
                width: 250,
                borderColor:'transparent'
              }}
 
              onClick={() => navigate("/login")}
 >Do You Have Already Account ? Log-In 
            </Button>
            <Button
              style={{
                marginTop: 8,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: "whitesmoke",
                fontWeight: "bold",
                width: 250,
                marginLeft:8
              }}
 
              onClick={(e) => signUpHandler()}
            >
              Sign Up
            </Button>
            </Col>
          </Col>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
