import React, { useEffect, useState } from "react";
import { Calendar, Card, Col, theme } from "antd";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const Diary = () => {
  const [chooseDate, setChooseDate] = useState();
  const [isShow, setIsShow] = useState(false);
  const [chooseHour, setChooseHour] = useState("");
  const [dayList, setDayList] = useState([]);

  const uID = localStorage.getItem("userID");
  console.log("UID: ", uID);

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 380,
    border: "2px solid black",
    borderRadius: token.borderRadiusLG,
  };

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const currentDays = await axios.get("http://127.0.0.1:5500/api/calendar");
        setDayList(currentDays.data);
        console.log(currentDays.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCalendar();
  }, []);

  const hours = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const handleHour = (e) => {
    setChooseHour(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async () => {
    const temp = chooseDate.toLocaleString().split(" ").slice([0, 4]);

    const newDayArray = [temp[0], temp[1], temp[2], temp[3]];

    const newTemp = newDayArray.toLocaleString().split(",");
    const lstArr = [newTemp[0], newTemp[2], newTemp[3], newTemp[4]];

    const newObject = {
      dayDate: lstArr.toLocaleString(),
      hourDate: chooseHour,
      userId: uID,
    };

    console.log(newObject);

    try {
      const response = await axios.post("http://127.0.0.1:5500/api/calendar", {
        dayDate: newObject.dayDate,
        chooseHour: newObject.hourDate,
        userUid: newObject.userId,
      });
      console.log(response.data); // Handle the response data as needed
    } catch (error) {
      console.error(error); // Handle any errors that occurred
    }
  };

  const handleDelete = async (item) => {
    try {
      const deletedItem = await axios.delete(
        `http://127.0.0.1:5500/api/calendar/${item._id}`
      );
      console.log("Calendar Deleted Successfully", deletedItem);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseIf = (item) => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      handleDelete(item);
      console.log("OK clicked");
      // Add your logic for OK button
    } else {
      console.log("Cancel clicked");
      // Add your logic for Cancel button
    }
  };

  return (
    <div className="mainContainerCal">
      <div className="calendar">
        <div className="calendar-container">
          <h3>Calendar</h3>
          <h3 style={{ color: "lightgray", marginTop: "24px" }}>Set A Date</h3>
          <div style={wrapperStyle}>
            <Calendar
              fullscreen={false}
              onPanelChange={onPanelChange}
              onSelect={(e) => setChooseDate(e)}
              className="custom-calendar" // Add a class for custom styling
            />
          </div>
          <button className="cal-btn" onClick={() => setIsShow(!isShow)}>
            Choose Day
          </button>
          {isShow && (
            <div className="choose-hours">
              <h3 style={{ marginBottom: "12px", color: "lightgray" }}>
                Choose Hour
              </h3>
              <div className="hour-row">
                {hours.slice(0, 3).map((item) => (
                  <div
                    className="hour-item"
                    id={item}
                    key={parseInt(item) + Math.random(1000)}
                  >
                    <button
                      key={parseInt(item)}
                      value={parseInt(item)}
                      className="hour-item-btn"
                      onClick={(e) => handleHour(e)}
                    >
                      {item}
                    </button>
                  </div>
                ))}
              </div>
              <div className="hour-row">
                {hours.slice(3, 6).map((item) => (
                  <div
                    className="hour-item"
                    id={item}
                    key={parseInt(item) + Math.random(1000)}
                  >
                    <button
                      key={parseInt(item)}
                      value={parseInt(item)}
                      className="hour-item-btn"
                      onClick={(e) => handleHour(e)}
                    >
                      {item}
                    </button>
                  </div>
                ))}
              </div>
              <div className="hour-row">
                {hours.slice(6, 9).map((item) => (
                  <div
                    className="hour-item"
                    id={item}
                    key={parseInt(item) + Math.random(1000)}
                  >
                    <button
                      key={parseInt(item)}
                      value={parseInt(item)}
                      className="hour-item-btn"
                      onClick={(e) => handleHour(e)}
                    >
                      {item}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {isShow && (
            <button onClick={handleSubmit} className="cal-btn">
              Submit
            </button>
          )}
        </div>
      </div>
      <div className="exist-days">
        <h3 style={{ textAlign: "center" }}>Book</h3>
        <div>
          <Col>
            {dayList.length > 0 &&
              dayList.map((item) => (
                <div className="trash-card" key={Math.random(502)}>
                  <Card
                    hoverable
                    className="card-docs"
                    style={{ backgroundColor: "whitesmoke", color: "black" }}
                    key={Math.random(502)}
                  >
                    {item.dayDate + " | " + item.chooseHour + ":00"}
                  </Card>
                  <RiDeleteBinLine
                    size={"24px"}
                    className="trash-icon"
                    onClick={() => handleChooseIf(item)} // Add a function to handle deletion
                  />
                </div>
              ))}
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Diary;
