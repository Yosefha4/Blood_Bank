import { Col, Layout, Row } from "antd";
import React from "react";

import { Link, Route, Routes } from "react-router-dom";

import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import DonateBlood from "./Screens/DonateBlood";
import GetBlood from "./Screens/GetBlood";
import HomePage from "./Screens/HomePage";
import StockInfo from "./Screens/StockInfo";
import MoreInfo from "./Screens/StockInfo";

const {  Footer, Sider, Content } = Layout;


const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
    
        <div className="main">
        <div className="routes">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/donateblood" element={<DonateBlood />} />
              <Route exact path="/getblood" element={<GetBlood />} />
              <Route exact path="/stock" element={<StockInfo />} />
            </Routes>
            </div>
            {/* <About /> */}
       
        </div>
        <Footer className="footer">by Yosef Haimjan.   @2023</Footer>
    </div>
  );
};

export default App;
