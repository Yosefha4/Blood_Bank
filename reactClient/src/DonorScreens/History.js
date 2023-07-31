import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import BarChart from "../components/BarChart";
import axios from "axios";

Chart.register(CategoryScale);

const History = (route) => {
  const [hostoryList, setHostoryList] = useState([]);

  const [currentUserId, setCurrentUserId] = useState("");
  const [listOfDonation, setListOfDonation] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [countData, setCountData] = useState([]);

  // const { parking } = route.params;
  let stateParam = useLocation();

  useEffect(() => {
    const getAllDonation = async () => {
      try {
        const res = await axios.get("https://blood-bank-2023.onrender.com/api/donation");
        // console.log(res)
        setListOfDonation(res.data);
        console.log("History Fetch", listOfDonation);
      } catch (error) {
        console.log(error);
      }
    };
    getAllDonation();

    // console.log(listDonation ? listDonation : " lst")
  }, []);

  useEffect(() => {
    const decryptAndFind = () => {
      if (listOfDonation.length > 0) {
        try {
          listOfDonation.forEach(async (item) => {
            const response = await axios.get(
              `https://blood-bank-2023.onrender.com/api/decrypt/${encodeURIComponent(
                item.donorId
              )}`
            );
            const { decryptedValue1 } = response.data;
            console.log(`The Encoded donor id :  ${decryptedValue1}`);

            if (decryptedValue1 === currentUserId) {
              console.log("yesss");
              if (
                !filteredList.some((filteredItem) => filteredItem.id === item.id)
              ) {
                setFilteredList((prev) => [...prev, item]);
              }
            }
          });
        } catch (error) {}
      }
    };
    decryptAndFind();
    console.log(filteredList);
  });

  useEffect(() => {
    const createChartData = async () => {
      const chartData = {};
      const currentYear = new Date().getFullYear();
      const startYear = 2016;

      for (let year = startYear; year <= currentYear; year++) {
        chartData[year] = 0;
      }

      const tempo = stateParam.state.currentUserDet;

      const filteredListLength = tempo.length;
      let counter = 0;

      for (const item of tempo) {
        const donorDate = item.info
          .split("Date:")[1]
          ?.split("|")[0]
          ?.trim();

        if (donorDate) {
          const year = parseInt(donorDate.split(" ")[3]);

          if (chartData.hasOwnProperty(year)) {
            chartData[year] += 1;
          }
        }

        counter += 1;

        if (counter === filteredListLength) {
          console.log("ChartData:", chartData);
          setCountData(Object.values(chartData));
          console.log(countData);
          // Use the updated chartData here or set it to state
        }
      }
    };

    if (stateParam?.state?.currentUserDet.length > 0) {
      createChartData();
    }
  }, [stateParam?.state?.currentUserDet]);

  useEffect(() => {
    console.log("The location params is : ", stateParam);
    // console.log(stateParam.state.currentUserDet[0].info)
    setHostoryList(stateParam?.state?.currentUserDet);

    const donorId = stateParam?.state?.currentUserDet
      ? stateParam?.state?.currentUserDet[0]?.info
          .split("Donor Id:")[1]
          ?.split("|")[0]
          ?.trim()
      : "null";

    setCurrentUserId(donorId);
    // console.log(donorId);
  });

  return (
    <div className="history-page">
       <h3 style={{ textAlign: "center" }}>History</h3>
      <div className="tempClass">
     
      <div className="container">
     
        <div className="history-docs">
          <h2 style={{ textShadow: "1px 1px 1px green" }}>Docs</h2>
          <div className="docs-fields">
            {hostoryList?.map((item) => (
              <div className="doc-item" key={Math.random(512)}>
                {item.info}
              </div>
            ))}
          </div>
        </div>
        <div className="graphs">
          <h2 style={{ textShadow: "1px 10px 10px red" , color:'black' }}>Graphs</h2>
          <div className="graph-item">
            {/* <Doughnut data={hostoryList} /> */}
            <BarChart chartData={countData} />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default History;
