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

  useEffect(() => {
    const getAllDonation = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/donation");
        // console.log(res)
        setListDonation(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllDonation();
  }, []);

  const checkStockAndMatch = async () => {
    const alternativeBlood = ["O-"];
    if (bloodType === "A+") {
      alternativeBlood.push("A+", "A-", "O+");
    } else if (bloodType === "A-") {
      alternativeBlood.push("A-");
    } else if (bloodType === "O+") {
      alternativeBlood.push("O+");
    } else if (bloodType === "B+") {
      alternativeBlood.push("B+", "B-", "O+");
    } else if (bloodType === "AB+") {
      alternativeBlood.push("A+", "A-", "B+", "B-", "AB+", "AB-", "O+");
    } else if (bloodType === "O-") {
      console.log("");
    } else if (bloodType === "B-") {
      alternativeBlood.push("B-");
    } else if (bloodType === "AB-") {
      alternativeBlood.push("AB-", "A-", "B-");
    }
    console.log(alternativeBlood);
    return alternativeBlood;
  };

  const orderBlood = async () => {
    console.log(amount, bloodType);
    let count = 0;
    let checkArray = (await checkStockAndMatch()).toString().split(",");
    console.log("check array.length is : " + checkArray.length);

    // try {
    //       const collectionOf = await axios.get(`http://localhost:5500/api/donation/${bloodType}`)

    //       // console.log(collectionOf.split(',').length)
    // } catch (error) {
    //   console.log(error)
    // }

    const tempCount = await listDonation.filter(
      (item) => item.bloodType === bloodType
    ).length;
    let restOfBlood = amount - tempCount;

    try {
      // const tempCount = listDonation.filter((item) => item.bloodType === bloodType).length
      // let restOfBlood = amount - tempCount
      console.log(restOfBlood);
      if (amount > tempCount) {
        // console.log("there is not enough bloodType units ! ! ! !")
        for (let j = 0; j < tempCount; j++) {
          const deletedUnit = await axios.delete(
            `http://localhost:5500/api/donation/${bloodType}`
          );
          count += 1;
          console.log("The count of match bloodType units is : ", count);
          console.log("The BloodDonate that deleted is : ", deletedUnit);
          console.log("The Rest of BloodDonate You Need is : ", restOfBlood);
          restOfBlood -= 1;
        }
        let alterMatchArray = [];
        alterMatchArray.push(
          (await checkStockAndMatch()).toLocaleString().split(",")
        );
        console.log("alter is : ", alterMatchArray);

        for (let x = 0; x < alterMatchArray.length; x++) {
          console.log("the x : ", alterMatchArray[x]);
          let temp = alterMatchArray[x];
          console.log(" The of ofo fo f of alter : ", temp.length);

          // let alterArrayTemp = listDonation.filter((item) => item.bloodType === temp).length
          // console.log(" The length of alter : ",alterArrayTemp)
          for (let s = 0; s < temp.length; s++) {
            if (
              listDonation.filter((item) => item.bloodType === temp[s])
                .length >= restOfBlood
            ) {
              console.log(
                "Yes We Have more " + restOfBlood + "blood units of" + temp[s]
              );
              for (
                let y = 0;
                y <
                listDonation.filter((item) => item.bloodType === temp[s])
                  .length;
                y++
              ) {
                const restOfDeleted = await axios.delete(
                  `http://localhost:5500/api/donation/${temp[s]}`
                );
                count += 1;
                console.log("The count of match bloodType units is : ", count);
                console.log(
                  "The -- Rest -- BloodDonate that deleted is : ",
                  restOfDeleted
                );
                restOfBlood -= 1;
              }
              if (restOfBlood = 0) {
                console.log("first")
                alert("You Got all blood units you need !");
                return;
              }
            } else {
              console.log(
                "We dont have exactly the number of rest from 1 blood type" +
                  temp[s]
              );
            }
          }
          // if(restOfBlood > 0) {
          //   alert("Sorry, We currently do not have enough blood units in stock. The Rest_Of_Blood you need is : " + restOfBlood)
          //   console.log("Sorry , The restOfBlood you need is : " + restOfBlood)
          // }

          for (let s = 0; s < temp.length; s++) {
            //   if(count = amount){console.log("Success ! You get all the blood unit you ask . 202 . ")
            //   return ;
            // }
            if (
              listDonation.filter((item) => item.bloodType === temp[s]).length >
              0
            ) {
              for (
                let y = 0;
                y <
                listDonation.filter((item) => item.bloodType === temp[s])
                  .length;
                y++
              ) {
                const restOfDeleted = await axios.delete(
                  `http://localhost:5500/api/donation/${temp[s]}`
                );
                restOfBlood-=1;
                console.log(
                  "The -- Rest -- BloodDonate that deleted is : ",
                  restOfDeleted
                );

                if (restOfBlood === 0) {
                  console.log(
                    "Success ! You get all the blood unit you ask . 202 . "
                    
                  );
                  alert("You Got all blood units you need !");

                  return;
                }
                // restOfBlood -= 1;
                console.log("The count of match bloodType units is : ", count);
                // console.log(
                //   "The -- Rest -- BloodDonate that deleted is : ",
                //   restOfDeleted
                // );
              }
            } 
          }
          // console.log("res res rez sssss " + restOfBlood)
          // if(restOfBlood > 0) {
          //   alert("Sorry, We currently do not have enough blood units in stock. The Rest_Of_Blood you need is : " + restOfBlood)
          //   console.log("Sorry , The restOfBlood you need is : " + restOfBlood)
          // }
          // else{
          //   console.log("You Got all blood units you need ! ")
          // }

          // if(temp.length >= restOfBlood){
          //   console.log("Yes We Have!!!" + temp)
          // }
          // else{
          //   console.log("No We Don't Have !!! Don't!")
          // }
          // temp = alterMatchArray[x];
          // console.log("temp is : : : " + temp)
          // temp.push(listDonation.filter((item) => item.bloodType === x).length)
          // if(restOfBlood > 0) {
          //   alert("Sorry, We currently do not have enough blood units in stock. The Rest_Of_Blood you need is : " + restOfBlood)
          //   console.log("Sorry , The restOfBlood you need is : " + restOfBlood)
          // }
          // else{
          //   console.log("You Got all blood units you need ! ")
          // }
        }
        // console.log("temp is : : : " + temp)
        // if(restOfBlood > 0) {
        //   alert("Sorry, We currently do not have enough blood units in stock. The Rest_Of_Blood you need is : " + restOfBlood)
        //   console.log("Sorry , The restOfBlood you need is : " + restOfBlood)
        // }
        // else{
        //   console.log("You Got all blood units you need ! ")
        // }
      } else {
        for (let j = 0; j < amount; j++) {
          const deletedUnit = await axios.delete(
            `http://localhost:5500/api/donation/${bloodType}`
          );
          count += 1;
          // restOfBlood-=1;

          if (count === amount) {
            console.log(
              "Success ! You get all the blood unit you ask . 202 . "
            );
            return;
          }

          console.log("The count of match bloodType units is : ", count);
          console.log("The BloodDonate that deleted is : ", deletedUnit);
          console.log("The Rest of BloodDonate You Need is : ", restOfBlood);
        }
        if (restOfBlood > 0) {
          alert(
            "Sorry, We currently do not have enough blood units in stock. The Rest_Of_Blood you need is : " +
              restOfBlood
          );
          console.log("Sorry , The restOfBlood you need is : " + restOfBlood);
        } else {
          console.log("You Got all blood units you need ! ");
        }
      }

      console.log("End offfff , the rest of : " + restOfBlood);
      if (restOfBlood > 0) {
        alert(
          "Sorry, We currently do not have enough blood units in stock. The Rest_Of_Blood you need is : " +
            restOfBlood
        );
        console.log("Sorry , The restOfBlood you need is : " + restOfBlood);
      } else {
        console.log("You Got all blood units you need ! ");
        alert("You Got all blood units you need !");
      }
      // if(restOfBlood > 0) {
      //   alert("Sorry, We currently do not have enough blood units in stock. The Rest_Of_Blood you need is : " + restOfBlood)
      //   console.log("Sorry , The restOfBlood you need is : " + restOfBlood)
      // }
      // else{
      //   console.log("You Got all blood units you need ! ")
      // }

      // for(let i = 0; i<amount ;i++){

      //   const deletedUnit = await axios.delete(`http://localhost:5500/api/donation/${bloodType}`)
      //   count += 1;

      //  console.log(count)
      //  console.log(deletedUnit)
      //  }
      //  return alert(
      //    "Success. Thank you !    " +
      //        new Date().toDateString()
      //  );

      // for(let i = 0; i<amount ;i++){

      //  const deletedUnit = await axios.delete(`http://localhost:5500/api/donation/${bloodType}`)
      //  count += 1;

      // console.log(count)
      // console.log(deletedUnit)
      // }
      // return alert(
      //   "Success. Thank you !    " +
      //       new Date().toDateString()
      // );

      // const deletedUnit = await axios.delete(`http://localhost:5500/api/donation/${bloodType}`)
      // console.log(deletedUnit)
    } catch (error) {
      console.log(error);
    }

    console.log("The rest of of the thethe is is ;: " + restOfBlood);
  };

  // console.log(listDonation)

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
  // console.log(`The Number of 'AB+' blood doses: ${ABplus}`)
  // console.log(`The Number of 'AB-' blood doses: ${ABminus}`)
  // console.log(`The Number of 'A+' blood doses: ${Aplus}`)
  // console.log(`The Number of 'B+' blood doses: ${Bplus}`)
  // console.log(`The Number of 'A-' blood doses: ${Aminus}`)
  // console.log(`The Number of 'B-' blood doses: ${Bminus}`)
  // console.log(`The Number of 'O+' blood doses: ${Oplus}`)
  console.log(`The Number of 'O-' blood doses: ${Ominus}`);
  // console.log("the current Aplus : " + Aplus , "the current ABminus : " + ABminus)

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
        Try Get Blood
      </Title>
      <Button
        style={{ backgroundColor: "black", color: "white" }}
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
              onClick={orderBlood}
              // onClick={(e) => addDonateBlood(e)}
            >
              Get Blood
            </Button>
          </Col>
        </Form>
      )}
      {/* <Form
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
            label={<p style={{ fontSize: "18px" }}>Full Name</p>}
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your Full Name!",
              },
            ]}
          >
            <Input onChange={(e)=> setDName(e.target.value)} value={dName}/>
          </Form.Item>
       
          <Form.Item
            name="Blood Type"
            label={<p style={{ fontSize: "18px" }}>Blood Type</p>}
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
            // onClick={(e) => addDonateBlood(e)}
          >
            Submit
          </Button>
        </Col>
      </Form> */}

      {/* {listDonation.map(item => (
        
        <p key={item._id}>{  item.bloodType}</p>
      
      ))} */}
    </div>
  );
};

export default GetBlood;
