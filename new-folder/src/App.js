import { Col, Layout, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";

import { Link, Route, Routes } from "react-router-dom";

import "./App.css";
// import About from "./components/About";
import Navbar from "./components/Navbar";
import DonateBlood from "./Screens/DonateBlood";
import GetBlood from "./Screens/GetBlood";
import HomePage from "./Screens/HomePage";
import StockInfo from "./Screens/StockInfo";
// import MoreInfo from "./Screens/StockInfo";
import GetDataPDFile from "./Screens/GetDataPDFile";
import SignUp from "./Screens/SignUp";
import Login from "./Screens/Login";
import Auth from "./Screens/Auth";

import { useCookies } from "react-cookie";
import { UserContext } from "./context/UserContext";

const { Footer, Sider, Content } = Layout;

const App = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const { userType } = useContext(UserContext);

  return (
    <div className="app">
      <div className="navbar">
        {cookies.access_token && cookies.access_token !== "undefined" && (
          <Navbar />
        )}
      </div>

      <div className="main">
        <div className="routes">
          {cookies.access_token ? (
            <Routes>
              <Route exact path="/" element={<Auth />} />

              <Route exact path="/home" element={<HomePage />} />
              <Route exact path="/donateblood" element={<DonateBlood />} />
              <Route exact path="/getblood" element={<GetBlood />} />
              <Route exact path="/stock" element={<StockInfo />} />

              <Route exact path="/logInfo" element={<GetDataPDFile />} />
            </Routes>
          ) : (
            <Routes>
              <Route exact path="/" element={<Auth />} />
            </Routes>
          )}
        </div>
      </div>
      <Footer className="footer">by Yosef Haimjan. @2023</Footer>
    </div>
  );
};

export default App;
