import { Button, Col, Form, Input, Radio, Row } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Auth = () => {
  const [changeAuth, setChangeAuth] = useState(true);


  const switchButton = changeAuth ? (
    <Button
      style={{
        backgroundColor: "transparent",
        borderColor: "transparent",
        fontWeight: "bold",
      }}
      onClick={() => setChangeAuth(!changeAuth)}
    >
      Do You Have Already Account ? Log-In{" "}
    </Button>
  ) : (
    <Button
      style={{
        backgroundColor: "transparent",
        borderColor: "transparent",
        fontWeight: "bold",
      }}
      onClick={() => setChangeAuth(!changeAuth)}
    >
      Don't have an account yet? Sign-Up
    </Button>
  );

  return (
    <div className="formContainer">
      {switchButton}
      {changeAuth ? <Register setChangeAuth={setChangeAuth} /> : <Login />}
    </div>
  );
};

export default Auth;

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const { setUserType } = useContext(UserContext);


  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://blood-bank-2023.onrender.com/api/login", {
        email: userEmail,
        password: userPassword,
      });
      // console.log("response: ", response)
      setUserType(response.data.uType)
      if (response.data.message === "User Doesn't Exist" || response.data.message ===  "User Email or Password incorrect ") {
        alert("User Email / Password incorrect .");
        return;
      } else {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        window.localStorage.setItem("userType", response.data.uType);

        navigate("/home");
      }

      //   console.log(first);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Col className="authContainer">
      <Form
        size="large"
        className="formContainer"
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
        <h2 style={{ marginBottom: 24 }}>Log-In</h2>

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
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            type="email"
          />
        </Form.Item>
        <Row className="formGroup">
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
              value={userPassword}
              type="password"
            />
          </Form.Item>
        </Row>

        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              marginTop: 8,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              backgroundColor: "whitesmoke",
              fontWeight: "bold",
              width: 250,
              marginLeft: 8,
            }}
            onClick={loginHandler}
          >
            Login
          </Button>
        </Col>
      </Form>
    </Col>
  );
};
const Register = ({setChangeAuth}) => {
  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState("");

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://blood-bank-2023.onrender.com/api/register", {
        fullName: fullName,
        email: userEmail,
        password: userPassword,
        userType: userType,
      });
      console.log(res.data.message);
      if (res.data.message === "User Already Exist!") {
        alert("User Already Exist!");
        return;
      } else {
        alert("Registration Completed! Now login.");
        setChangeAuth(false)
        // setChangeAuth(false)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Col className="authContainer">
      <Form
        size="large"
        className="formContainer"
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
        <h2 style={{ marginBottom: 24 }}>Register</h2>
        <Row>
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
        </Row>

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
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
          />
        </Form.Item>
        <Row className="formGroup">
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
              value={userPassword}
              type="password"
            />
          </Form.Item>
        </Row>
        <Row>
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
        </Row>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Button
              style={{
                marginTop: 24,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor:'transparent',
                // fontWeight: "bold",
                width: 250,
                borderColor:'transparent',
                marginRight:24
                
              }}
 
              onClick={() => navigate("/login")}
 >Do You Have Already Account ? Log-In 
            </Button> */}
          <Button
            style={{
              marginTop: 8,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              backgroundColor: "whitesmoke",
              fontWeight: "bold",
              width: 250,
              // marginLeft:8
            }}
            onClick={signUpHandler}
          >
            Sign Up
          </Button>
        </Col>
      </Form>
    </Col>
  );
};
