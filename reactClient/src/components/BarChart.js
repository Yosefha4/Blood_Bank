import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  const data = {
    labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Number of Donations",
        data: Object.values(chartData), // Replace with your actual data
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        color: "black",
        // borderColor:'black'
        borderWidth:3,
        
      },
    ],
  };

  return (
    <div style={{color:'black'}}>
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "User Donation between 2016-2023",
              color: "black",
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Year",
                color: "black",
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Donations",
                color: "black",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
