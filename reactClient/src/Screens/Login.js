import React, {  useState } from "react";
import { Typography, Col, Form, Input, Radio, Button } from "antd";
import axios from "axios";
import { useNavigate  } from "react-router-dom";


const { Title } = Typography;

const Login = ({handleAuthentication }) => {
    // const history = useHistory();
    const navigate = useNavigate();

//   const [fullName, setFullName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [userPassword, setUserPassword] = useState("");
//   const [userType, setUserType] = useState("");



  const logInHandler = async (e) => {
    if (!emailInput || !userPassword) {
      console.log("Something Wrong...");
      e.preventDefault();
    } else {
      try {
        const res = await axios.post("http://localhost:5500/api/login", {
          email: emailInput,
          password: userPassword,
        });
  
        console.log(res);
        const responseMessage = res.data; // Get the response message from the server
  
        if (responseMessage === "Success") {
          const loginInfo =
            "Action: Log-In | Email: " +
            emailInput +
            " | Password: " +
            userPassword +
            " | ";
  
          console.log("Login Details: " + loginInfo);
          alert(
            "Success. Thank you! " +
              res.config.data +
              " Date: " +
              new Date().toDateString()
          );
          handleAuthentication(true);
          return navigate("/home");
        } else {
          alert("Login failed. " + responseMessage);
        }
      } catch (error) {
        console.log(error);
        return alert("Something went wrong... Please try again later.");
      }
    }
  };

  return (
    <div className="donated">
      <div className="authContainer">
        <Title color="black" level={2} className="heading">
          Log-In
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
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                onChange={(e) => setUserPassword(e.target.value)}
                value={userPassword}
              />
            </Form.Item>


            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
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
 
              onClick={() => navigate("/")}
 >Don't have an account yet? Sign-Up
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
 
              onClick={(e) => logInHandler()}
            >
              Login
            </Button>
            </div>
          </Col>
        </Form>
      </div>
    </div>
  );
};

export default Login;
