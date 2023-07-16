import { Layout } from "antd";
import React, { useContext } from "react";

import { Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import DonateBlood from "./Screens/DonateBlood";
import GetBlood from "./Screens/GetBlood";
import HomePage from "./Screens/HomePage";
import StockInfo from "./Screens/StockInfo";
import GetDataPDFile from "./Screens/GetDataPDFile";

import Auth from "./Screens/Auth";

import { useCookies } from "react-cookie";
import { UserContext } from "./context/UserContext";
import Profile from "./DonorScreens/Profile";
import History from "./DonorScreens/History";
import Diary from "./DonorScreens/Diary";
// import { UserContext } from "./context/UserContext";

const { Footer } = Layout;

const App = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  // const { userType } = useContext(UserContext);
  // console.log("UserType : ", userType);

  const uType = localStorage.getItem("userType");
  // console.log("UType : ", uType);

  const donorRoutes = () => {
    // console.log(" fififiifif");
    if (uType === "Donor") {
      return (
        <>
          <Route exact path="/home" element={<HomePage />} />

          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/history" element={<History userDet />} />
          <Route exact path="/diary" element={<Diary />} />
        </>
      );
    } else if (
      uType === "Admin" ||
      uType === "Student" ||
      uType === "Employee"
    ) {
      return (
        <>
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/donateblood" element={<DonateBlood />} />
          <Route exact path="/getblood" element={<GetBlood />} />
          <Route exact path="/stock" element={<StockInfo />} />
          <Route exact path="/logInfo" element={<GetDataPDFile />} />
        </>
      );
    } else {
      return null;
    }
  };
  // const restRoutes = () => {
  //   if (
  //     userType === "Admin" ||
  //     userType === "Student" ||
  //     userType === "Employee"
  //   ) {
  //     return (
  //       <>
  //         <Route exact path="/home" element={<HomePage />} />
  //         <Route exact path="/donateblood" element={<DonateBlood />} />
  //         <Route exact path="/getblood" element={<GetBlood />} />
  //         <Route exact path="/stock" element={<StockInfo />} />
  //         <Route exact path="/logInfo" element={<GetDataPDFile />} />
  //       </>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

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

              {donorRoutes()}

              {/* <Route exact path="/home" element={<HomePage />} />
              <Route exact path="/donateblood" element={<DonateBlood />} />
              <Route exact path="/getblood" element={<GetBlood />} />
              <Route exact path="/stock" element={<StockInfo />} />
              <Route exact path="/logInfo" element={<GetDataPDFile />} />

              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/history" element={<History />} />
              <Route exact path="/diary" element={<Diary />} /> */}
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
