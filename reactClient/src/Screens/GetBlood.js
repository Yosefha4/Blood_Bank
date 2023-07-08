import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Col,
  Input,
  Form,
  Select,
  Button,
  Alert,
  Layout,
  Card,
} from "antd";


const { Title } = Typography;
const { Option } = Select;

const GetBlood = () => {
  const [listDonation, setListDonation] = useState([]);

  const [amount, setAmount] = useState("");
  const [dId, setDiD] = useState("");
  const [bloodType, setBloodType] = useState("");

  const [isEmergency, setIsEmergency] = useState(false);
  const [isCheckingExpiration, setIsCheckingExpiration] = useState(false);

  useEffect(() => {
    const getAllDonation = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/donation");
        // console.log(res)
        setListDonation(res.data);
        console.log("first" , listDonation)
      } catch (error) {
        console.log(error);
      }
    };
    getAllDonation();
    console.log(listDonation ? listDonation : " lst")
  }, []);

  const checkAndUpdateExpiration = async () => {
      const thirtyFiveDaysAgo = new Date();
      thirtyFiveDaysAgo.setDate(thirtyFiveDaysAgo.getDate() - 35);
  
      listDonation.map(async (donate) => {
        if (
          !donate.isExpired &&
          new Date(donate.donationDate) <= thirtyFiveDaysAgo
        ) {
          console.log("We found an expired blood unit!");
          console.log(donate._id)
          try {
            // await axios.put(`http://localhost:5500/api/donation/${donate._id}`)
            // console.log("Expired flag update successfully !")
  
            await axios.delete(`http://localhost:5500/api/donation/id/${donate._id}`)
            console.log("Expired item deleted successfully !")
  
            const expiredInfo =  "Action : Updating `isExpired` flag & Delete BloodUnit. Expired blood dose, it is no longer in stock. | " +  "Name: " + donate.name + " | " + " Address: " + donate.address + " | " +  "BirthDay: " +donate.birthDay  + " | " + "Donor Id: " + donate._id + " | " + "Blood Type: " + donate.bloodType + "IsExpired ?  " + donate.isExpired +" | " + "Date: " + new Date().toDateString();
            console.log("update expired flag of blood unit add to information ",expiredInfo)
            axios.post("http://localhost:5500/api/logInfo", {
              info: expiredInfo,
              bdDate: new Date().toDateString(),
            });
  
          } catch (error) {
            console.error(error)
          }
     
        }
      });
    };
 
    checkAndUpdateExpiration();


  let lengthOfArr = 0;

  const checkStockAndMatch = async () => {
    let alternativeBlood = ["O-"];

    if (bloodType === "A+") {
      alternativeBlood.push("A-", "O+");
      lengthOfArr = 3;
    } else if (bloodType === "A-") {
      console.log("");
      lengthOfArr = 1;
    } else if (bloodType === "O+") {
      console.log("");
      lengthOfArr = 1;
    } else if (bloodType === "B+") {
      alternativeBlood.push("B-", "O+");
      lengthOfArr = 3;
    } else if (bloodType === "AB+") {
      alternativeBlood.push("A+", "A-", "B+", "B-", "AB-", "O+");
      lengthOfArr = 7;
    } else if (bloodType === "O-") {
      console.log("");
      lengthOfArr = 1;
    } else if (bloodType === "B-") {
      console.log("");
      lengthOfArr = 1;
    } else if (bloodType === "AB-") {
      alternativeBlood.push("A-", "B-");
      lengthOfArr = 3;
    }
    console.log(alternativeBlood);
    return alternativeBlood;
  };

  const orderUnitsOfBlood = async () => {
    let unitsCount = 0;
    let matchUnitCount = listDonation.filter(
      (item) => item.bloodType === bloodType
    ).length;

    if (amount === "0") {
      console.log("Sorry , 0 isn't valid input . ");
      return;
    }

    //*************//
    else if (amount <= matchUnitCount) {
      console.log("Yes we have >= units of your blood type !");
      for (let j = 0; j < amount; j++) {
        const deletedUnit = await axios.delete(
          `http://localhost:5500/api/donation/${bloodType}`
        );
        console.log("The BloodDonate that deleted is : ", deletedUnit);
        // console.log("The Data of ...  that deleted is : ", deletedUnit.data);

        await axios.post("http://localhost:5500/api/logInfo", {
          info: deletedUnit.data,
        });

        unitsCount += 1;
      }
      if (unitsCount.toString() === amount) {
        console.log("You got all the blood you asked for .");
      }
      alert("You Got What You Ask For")
    }
    //*************//
    else {
      //(matchUnitCount < amount)  -->> we need check the alternative list of blood
      console.log(
        "Sorry , we dont have enough _ units of your blood type... try again later."
      );
      // let checkArray = checkStockAndMatch().toString().split(",");
      // console.log("the length of is : " + lengthOfArr)
      // console.log("the 0 : " + checkArray)

      for (let x = 0; x < matchUnitCount; x++) {
        const deletedUnit = await axios.delete(
          `http://localhost:5500/api/donation/${bloodType}`
        );
        console.log("The BloodDonate that deleted is : ", deletedUnit);

        await axios.post("http://localhost:5500/api/logInfo", {
          info: deletedUnit.data,
        });

        unitsCount += 1;
      }

      let alterMatchArray = [];
      alterMatchArray.push(
        (await checkStockAndMatch()).toLocaleString().split(",")
      );
      console.log("alter is : ", alterMatchArray[0]);

      for (let y = 0; y < lengthOfArr; y++) {
        // console.log("first")
        let alternativeCount = listDonation.filter(
          (item) => item.bloodType === alterMatchArray[0][y]
        ).length;
        console.log(alternativeCount);

        if (alternativeCount > 0) {
          for (let j = 0; j < alternativeCount; j++) {
            const deletedUnit = await axios.delete(
              `http://localhost:5500/api/donation/${alterMatchArray[0][y]}`
            );
            console.log("The BloodDonate that deleted is : ", deletedUnit);

            await axios.post("http://localhost:5500/api/logInfo", {
              info: deletedUnit.data
            });

            unitsCount += 1;
            if (unitsCount.toString() === amount) {
              console.log("You got all the blood you asked for .");
              alert("You got all the blood you asked for .");
              return;
            }
          }
        }
        if (unitsCount.toString() === amount) {
          console.log("You got all the blood you asked for .");
          alert("You got all the blood you asked for .");
          return;
        }

        // for(let j = 0 ; j < alternativeCount ; j ++){
        //   if()
        // }
      }

      // for(let i=0;i<lengthOfArr-1;i++){
      //   console.log(checkArray[i].toString)
      // }
    }

    if (unitsCount.toString() !== amount) {
      console.log(
        "Sorry , we dont have enough _ units of your blood type... try again later."
      );
      alert(
        "Sorry , we dont have enough _ units of your blood type... try again later."
      );
      return;
    }
  };

  // console.log("first", listDonation);

  // const checkAndUpdateExpiration = async () => {
  //   const thirtyFiveDaysAgo = new Date();
  //   thirtyFiveDaysAgo.setDate(thirtyFiveDaysAgo.getDate() - 35);

  //   listDonation.map(async (donate) => {
  //     if (
  //       !donate.isExpired &&
  //       new Date(donate.donationDate) <= thirtyFiveDaysAgo
  //     ) {
  //       console.log("We found an expired blood unit!");
  //       console.log(donate._id)
  //       try {
  //         // await axios.put(`http://localhost:5500/api/donation/${donate._id}`)
  //         // console.log("Expired flag update successfully !")

  //         await axios.delete(`http://localhost:5500/api/donation/id/${donate._id}`)
  //         console.log("Expired item deleted successfully !")

  //         const expiredInfo =  "Action : Updating `isExpired` flag & Delete BloodUnit. Expired blood dose, it is no longer in stock. | " +  "Name: " + donate.name + " | " + " Address: " + donate.address + " | " +  "BirthDay: " +donate.birthDay  + " | " + "Donor Id: " + donate.id + " | " + "Blood Type: " + donate.bloodType + "IsExpired ?  " + donate.isExpired +" | " + "Date: " + new Date().toDateString();
  //         console.log("update expired flag of blood unit add to information ",expiredInfo)
  //         axios.post("http://localhost:5500/api/logInfo", {
  //           info: expiredInfo,
  //         });

  //       } catch (error) {
  //         console.error(error)
  //       }
   
  //     }
  //   });
  // };
  // checkAndUpdateExpiration();

  const ABplus = listDonation.filter((item) => item.bloodType === "AB+").length;
  const ABminus = listDonation.filter(
    (item) => item.bloodType === "AB-"
  ).length;
  const Aplus = listDonation.filter((item) => item.bloodType === "A+").length;
  const Bplus = listDonation.filter((item) => item.bloodType === "B+").length;
  const Aminus = listDonation.filter((item) => item.bloodType === "A-").length;
  const Bminus = listDonation.filter((item) => item.bloodType === "B-").length;
  const Oplus = listDonation.filter((item) => item.bloodType === "O+").length;
  const Ominus = listDonation.filter((item) => item.bloodType === "O-").length;

  const getResOfButton = () => {
    const tempr = getEmergency();
    return !tempr
      ? "Sorry we dont have any O- blood unit."
      : `'We Have ${Ominus} blood units of 'O-' for you !`;
  };

  async function getEmergency() {
    if (Ominus === 0) {
      console.log("Blood units of type O- are not available in stock");
      alert(
        "Blood units of O-  type are not available in stock . Please try again later .."
      );
      return false;
    } else if (Ominus >= amount) {
      try {
        for (let j = 0; j < amount; j++) {
          const deletedUnit = await axios.delete(
            `http://localhost:5500/api/donation/O-`
          );

          await axios.post("http://localhost:5500/api/logInfo", {
            info: deletedUnit.data,
          });

          console.log(deletedUnit);
        }
      } catch (error) {
        console.log(error);
      }
      console.log(`We can get you ${amount} units of O- blood type! `);
      alert(`You received ${amount} units of O- blood type!`);
    } else if (Ominus < amount) {
      try {
        for (let j = 0; j < Ominus; j++) {
          const deletedUnit = await axios.delete(
            `http://localhost:5500/api/donation/O-`
          );

          await axios.post("http://localhost:5500/api/logInfo", {
            info: deletedUnit.data,
          });

          console.log(deletedUnit);
        }
      } catch (error) {
        console.log(error);
      }
      console.log(
        `Sorry , we can get you just ${Ominus} units of O- blood type`
      );
      alert(`Sorry , we can get you just ${Ominus} units of O- blood type`);
    } else {
      console.log(`we have ${Ominus} units of blood in our stock`);
      console.log(`We need ${amount} units of O- Blood type.`);
      return true;
    }
  }

  return (
    <div className="formContainer">
      <Title level={2} className="heading" style={{ marginTop: 36 }}>
         Get Blood
      </Title>
      <Button
        style={{ backgroundColor:'transparent', color: "white" ,border:'none' }}
        onClick={() => {
          setIsEmergency(!isEmergency);
        }}
      >
        This_Is_Emergancy?
      </Button>

      {isEmergency ? (
        <Form
          size="large"
          className="bloodForm"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          <Col style={{ display: "grid" }}>
            <Title level={4} className="heading" style={{ marginBottom: 36 }}>
              Emergency
            </Title>
            <Input
              style={{ textAlign: "center" }}
              type="number"
              placeholder="How much you need ?"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
            <Button
              style={{
                marginTop: 24,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: "whitesmoke",
                fontWeight: "bold",
                boxShadow: "5px 10px 10px black",
              }}
              onClick={getResOfButton}
              // onClick={(e) => addDonateBlood(e)}
            >
              Get Blood For Emergency
            </Button>
          </Col>
        </Form>
      ) : (
        <Form
          //   onSubmit={e=> addDonateBlood(e)}
          size="large"
          className="bloodForm"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          <Col style={{ display: "grid" }}>
            <Form.Item
              className="formItem"
              label={<p style={{ fontSize: "18px" }}>Amount</p>}
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please input the Number of blood units!",
                },
              ]}
            >
              <Input
                style={{ textAlign: "center" }}
                type="number"
                placeholder="How much you need ?"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </Form.Item>

            <Form.Item
              name="Blood Type"
              label={<p style={{ fontSize: "18px" }}>B.Type</p>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select Your Blood Type"
                onSelect={(value) => setBloodType(value)}
                //   onChange={e => console.log(e.target.value)}
                //   onChange={e => setBloodType(e.tagert.value)}

                allowClear
              >
                <Option value="Select">Select</Option>
                <Option value="A+">A+</Option>
                <Option value="O+">O+</Option>
                <Option value="B+">B+</Option>
                <Option value="AB+">AB+</Option>
                <Option value="A-">A-</Option>
                <Option value="O-">O-</Option>
                <Option value="B-">B-</Option>
                <Option value="AB-">AB-</Option>
              </Select>
            </Form.Item>
            <Button
              style={{
                marginTop: 24,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: "whitesmoke",
                fontWeight: "bold",
              }}
              onClick={orderUnitsOfBlood}
              // onClick={(e) => addDonateBlood(e)}
            >
              Get Blood
            </Button>
          </Col>
        </Form>
      )}
      
    </div>
  );
};

export default GetBlood;
