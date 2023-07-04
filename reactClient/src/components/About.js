import { Table, Typography } from "antd";
import React from "react";

const dataSource = [
  {
    key: "1",
    name: "A+",
    Donate: "A+, AB+",
    Receive: "A+, A-, O+, O-",
  },
  {
    key: "2",
    name: "O+",
    Donate: "O+, A+, B+, AB+",
    Receive: "O+, O-",
  },
  {
    key: "3",
    name: "B+",
    Donate: "B+, AB+",
    Receive: "B+, B-, O+, O-",
  },
  {
    key: "4",
    name: "AB+",
    Donate: "AB+",
    Receive: "Everyone",
  },
  {
    key: "5",
    name: "A-",
    Donate: "A-, A+, AB-, AB+",
    Receive: "A-, O-",
  },
  {
    key: "6",
    name: "O-",
    Donate: "Everyone",
    Receive: "O-",
  },
  {
    key: "7",
    name: "B-",
    Donate: "B-, B+, AB-, AB+",
    Receive: "B-, O-",
  },
  {
    key: "8",
    name: "AB-",
    Donate: "AB-, AB+",
    Receive: "AB-, A-, B-, O-",
  },
];

const columns = [
  {
    title: "Blood Type",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Donate Blood To",
    dataIndex: "Donate",
    key: "name",
    align: "center",
  },
  {
    title: "Receive Blood From",
    dataIndex: "Receive",
    key: "name",
    align: "center",
  },
];

const columns2 = [
  {
    title: "Country",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Population",
    width: 100,
    dataIndex: "Population",
    key: "Population",
    fixed: "left",
    sorter: true,
  },
  {
    title: "O+",
    dataIndex: "O1",
    key: "1",
    
  },
  {
    title: "A+",
    dataIndex: "A1",
    key: "2",
  },
  {
    title: "B+",
    dataIndex: "B1",
    key: "3",
  },
  {
    title: "AB+",
    dataIndex: "AB1",
    key: "4",
  },
  {
    title: "O-",
    dataIndex: "O2",
    key: "5",
  },
  {
    title: "A-",
    dataIndex: "A2",
    key: "6",
  },
  {
    title: "B-",
    dataIndex: "B2",
    key: "7",
  },
  {
    title: "AB-",
    dataIndex: "AB2",
    key: "8",
  },
];
const data2 = [
  {
    key: "1",
    name: "Israel",
    Population: "8,323,659",
    O1: "32.0%",
    A1: "34.0%",
    B1: "17.0%",
    AB1: "7.0%",
    O2: "3.0%",
    A2: "4.0%",
    B2: "2.0%",
    AB2: "1.0%",
 
  },
  // {
  //   key: '2',
  //   name: 'Jim Green',
  //   age: 40,
  //   address: 'London Park',
  // },
];

const About = () => {
  return (
    <div className="aboutContainer">
      <Typography.Title className="heading"  style={{marginBottom:24}} level={2} color='white'>Information</Typography.Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        size="middle"
        className="table"
        pagination={false}
      />
      <Table
        dataSource={data2}
        columns={columns2}
        size="middle"
        className="table"
        pagination={false}
      />
      
    </div>
  );
};

export default About;
