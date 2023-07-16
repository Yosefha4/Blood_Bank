import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Animation from "./Animation";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [listDonation, setListDonation] = useState([]);
  const [count, setCount] = useState(0);
  const [currentUserDet, serCurrentUserDet] = useState([]);
  const [realUserid, setRealUserid] = useState("");
  const [bloodType, setBloodType] = useState("");

  const navigation = useNavigate();

  const uID = localStorage.getItem("userID");
  console.log("UID : ", uID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5500/api/getUser/" + uID
        );
        setUserName(response.data.currUser.fullName);
        setUserEmail(response.data.currUser.email);
        setUserID(response.data.currUser.userID);

        console.log("Fetch data success");
        console.log(response.data);
        console.log(response.data.currUser.fullName);
        console.log(response.data.currUser.userID);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userEmail]);

  useEffect(() => {
    const checkData = async () => {
      try {
        // const tempRes = await axios
        //   .get(`http://127.0.0.1:5500/api/decrypt/${userID}`)
        //   .then((response) => {
        //     const { userRealID } = tempRes.data;
        //     console.log(`decryptedValue1 is : ${userRealID}`);
        //     // Perform any additional actions with the response here
        //   });

        const response = await axios.get("http://127.0.0.1:5500/api/logInfo");
        // setUserName(response.data.currUser.fullName)
        // setUserEmail(response.data.currUser.email)
        const filteredList = response.data.filter((item) => item.email);
        setListDonation(filteredList);

        filteredList.forEach((item) => {
          if (item.email === userEmail) {
            if (
              !currentUserDet.some(
                (existingItem) => existingItem.id === item.id
              )
            ) {
              console.log("email match!");
              serCurrentUserDet((prevState) => [...prevState, item]);
            }
          }
        });
        // filteredList.forEach(item => {
        //   const bloodType = extractBloodType(item.info);
        //   console.log(bloodType);
        // });

        console.log("first", listDonation);

        console.log("Check data success");

        response.data.forEach((item) => {
          if (item.email === userEmail) {
            console.log("Mtachhhh");
            const bloodType = extractBloodType(item.info);
            setBloodType(bloodType);
            return;
          }

          // console.log(item.donorId + "|THE" + userID);
          // axios
          //   .get(`http://127.0.0.1:5500/api/decrypt/${item.donorId}`)
          //   .then((response) => {
          //     const { decryptedValue1 } = response.data;
          //     if (decryptedValue1 === realUserid) {
          //       serCurrentUserDet(item);
          //       console.log("Yesssssssssss");
          //     }
          //     console.log(`decryptedValue1 is : ${decryptedValue1}`);
          //     // Perform any additional actions with the response here
          //   });
        });
      } catch (error) {
        console.log(error);
      }
    };
    // Execute the random function three times
    checkData();
  }, [count]);

  useEffect(() => {
    const tempFunc = async () => {
      console.log("Temp Function Start");
      userID.length > 0 &&
        (await axios
          .get(
            `http://127.0.0.1:5500/api/decrypt/${encodeURIComponent(userID)}`
          )
          .then((response) => {
            const { decryptedValue1 } = response.data;
            setRealUserid(decryptedValue1);
            console.log(
              `decryptedValue1 decryptedValue1 decryptedValue1 is : ${decryptedValue1}`
            );
            // Perform any additional actions with the response here
          }));
    };
    tempFunc();
  }, [count]);

  /*  */
  // Function to extract the value after "Blood Type" in the info string
  const extractBloodType = (info) => {
    const bloodTypeIndex = info.indexOf("Blood Type: ");
    if (bloodTypeIndex !== -1) {
      const bloodTypeValue = info
        .substring(bloodTypeIndex + 12)
        .split(" |")[0]
        .trim();
      return bloodTypeValue;
    }
    return null;
  };

  const updateStateRepeatedly = (times) => {
    let counter = 0;
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      counter++;

      if (counter === times) {
        clearInterval(intervalId);
      }
    }, 3000);
  };

  useEffect(() => {
    updateStateRepeatedly(3);
  }, []);

  // const checkData = async () => {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:5500/api/donation/");
  //     // setUserName(response.data.currUser.fullName)
  //     // setUserEmail(response.data.currUser.email)
  //     setListDonation(response.data);
  //     console.log("first", listDonation);

  //     console.log("Check data success");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // checkData();

  return (
    <div className="profile-container">
      {/* <div className="profile-page"> */}
      <div className="profile-frame">
        {/* Add your user profile content here */}
        <h1>User Profile</h1>
        <div className="profile-det-line">
          <p>
            <strong>Username:</strong>
            </p>
            <p>
            {userName}
            </p>
         
        </div>
        <div className="profile-det-line">

        <p>
          <strong>Email:</strong> 
        </p>
        <p>
        {userEmail}
        </p>
        </div>
        <p>
          <strong>Blood Type:</strong>{" "}
          <strong
            style={{
              marginLeft: 8,
              color: "white",
              backgroundColor: "red",
              padding: 4,
            }}
          >
            {bloodType ? bloodType : "Unknown"}{" "}
          </strong>
        </p>

        {/* ...other user details */}
        {/* </div> */}
      </div>
      <div className="profileBtn">
        <Link to="/history" state={{ currentUserDet: currentUserDet }}>
          <button className="btn">History</button>
        </Link>
        <button className="btn">Feedback</button>
      </div>

      {/* <Animation /> */}
    </div>
  );
};

export default Profile;
