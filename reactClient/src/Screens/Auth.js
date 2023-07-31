import { Button, Col, Form, Input, Radio, Row } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Animation from "../DonorScreens/Animation";


const Auth = () => {
  const [changeAuth, setChangeAuth] = useState(true);

  const switchButton = changeAuth ? (
    <Button
      style={{
        backgroundColor: "transparent",
        borderColor: "transparent",
        fontWeight: "bold",
        fontSize:"20px"
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
        fontSize:"20px"

      }}
      onClick={() => setChangeAuth(!changeAuth)}
    >
      Don't have an account yet? Sign-Up
    </Button>
  );

  return (
    <div >
    <div className="formContainer">
          {/* <Animation /> */}

      {switchButton}
      {changeAuth ? <Register setChangeAuth={setChangeAuth} /> : <Login />}
      

    </div>
    {/* <Animation /> */}
    </div>
  );
};

export default Auth;

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const { setUserType } = useContext(UserContext);

  const [_, setCookies] = useCookies(["access_token"]);

  const [isHovered, setIsHovered] = useState(false);


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://blood-bank-2023.onrender.com/api/login",
        {
          email: userEmail,
          password: userPassword,
        }
      );
      // console.log("response: ", response)
      setUserType(response.data.uType);
      if (
        response.data.message === "User Doesn't Exist" ||
        response.data.message === "User Email or Password incorrect "
      ) {
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
        <h2 style={{ marginBottom: 24,fontSize:'38px' }}>Log-In</h2>

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
            style={{border:'1px solid black'}}
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
              style={{border:'1px solid black'}}
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
              backgroundColor: isHovered ? 'lightpink': "whitesmoke",
              fontWeight: "bold",
              width: 250,
              marginLeft: 8,
              border:'1px solid black'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={loginHandler}
          >
            Login
          </Button>
        </Col>
      </Form>
    </Col>
  );
};
const Register = ({ setChangeAuth }) => {
  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [userID, setUserID] = useState("");
  const [userPhone, setUserPhone] = useState("");

  
  const [isHovered, setIsHovered] = useState(false);


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:5500/api/register",
        {
          fullName: fullName,
          email: userEmail,
          password: userPassword,
          userType: userType,
          userID: userID,
          userPhone: userPhone,
        }
      );
      console.log(res.data.message);
      if (res.data.message === "User Already Exist!") {
        alert("User Already Exist!");
        return;
      } else {
        alert("Registration Completed! Now login.");
        setChangeAuth(false);
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
        <h2 style={{ marginBottom: 24,fontSize:'38px'  }}>Register</h2>
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
              style={{border:'1px solid black'}}
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
            style={{border:'1px solid black'}}
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
              style={{border:'1px solid black'}}
            />
          </Form.Item>
        </Row>
        <Row className="formGroup">
          <Form.Item
            className="formItem"
            label={
              <p style={{ fontSize: "18px", width: 100, fontWeight: "bold" }}>
                ID
              </p>
            }
            name="userID"
            rules={[
              {
                required: true,
                message: "Please input valid ID!",
              },
            ]}
          >
            <Input
              onChange={(e) => setUserID(e.target.value)}
              value={userID}
              type="id"
              style={{border:'1px solid black'}}
            />
          </Form.Item>
        </Row>
        <Row className="formGroup">
          <Form.Item
            className="formItem"
            label={
              <p style={{ fontSize: "18px", width: 100, fontWeight: "bold" }}>
                Phone
              </p>
            }
            name="userPhone"
            rules={[
              {
                required: true,
                message: "Please input valid Phone!",
              },
            ]}
          >
            <Input
              onChange={(e) => setUserPhone(e.target.value)}
              value={userPhone}
              type="phone"
              style={{border:'1px solid black'}}
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
            <div className="radioGroup">
              <Radio.Group
                onChange={(e) => setUserType(e.target.value)}
                style={{ display: "flex" }}
              >
                <Radio style={{ fontSize: 16 }} value={"Student"}>
                  Student
                </Radio>
                <Radio style={{ fontSize: 16 }} value={"Employee"}>
                  Employee
                </Radio>
                <Radio style={{ fontSize: 16 }} value={"Donor"}>
                  Donor
                </Radio>
              </Radio.Group>
            </div>
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
              backgroundColor: isHovered ? 'lightpink': "whitesmoke",
              fontWeight: "bold",
              width: 250,
              border: '1px solid black'
              // marginLeft:8
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={signUpHandler}
          >
            Sign Up
          </Button>
        </Col>
      </Form>
    </Col>
  );
};
