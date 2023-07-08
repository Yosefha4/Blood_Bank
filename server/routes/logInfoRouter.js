const router = require("express").Router();
const logInfo = require("../models/logInfo");
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");


// // Create route to add log info
// router.post('/api/logInfo', async (req, res) => {
//   try {
//     const encryptedInfo = await bcrypt.hash(req.body.info, 10);
//     const encryptedEmail = await bcrypt.hash(req.body.email, 10);
//     // const encryptedBdDate = await bcrypt.hash(req.body.bdDate, 10);

//     const newLogInfo = new logInfo({
//       info: encryptedInfo,
//       isSentMail: false,
//       email: encryptedEmail,
//       bdDate: new Date().toDateString()
// });

//     const saveInfo = await newLogInfo.save();
//     res.status(200).json('Log Information Added Successfully.');
//   } catch (error) {
//     res.json(error);
//   }
// });

//------------------------------------------------------------------------------------



router.post("/api/logInfo", async (req, res) => {
  try {
    const newLogInfo = new logInfo({
      info: req.body.info,
      isSentMail: false,
      email:req.body.email,
      bdDate: req.body.bdDate
    });

    const saveInfo = await newLogInfo.save();
    res.status(200).json("Log Information Added Successfully.");
  } catch (error) {
    res.json(error);
  }
});

// Encrypt function using AES
function encryptData(data, secretKey) {
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encryptedData;
}

// router.post("/api/logCrypt", async (req, res) => {
//   try {
//     const { info, email ,bdDate} = req.body;
//     const encryptedInfo = encryptData(info, "your-secret-key");

//     const newLogInfo = new logInfo({
//       info: encryptedInfo,
//       email: email,
//       bdDate: bdDate,
//     });
//     await newLogInfo.save();
//     res.status(200).json("Log Information Added Successfully.");
//     console.log('logInfoSuccess')
//     // ... Handle the response
//   } catch (error) {
//     res.json(error);
//     console.log('logInfoError')

//   }
// });
//---------------------------------------------------------------------------------------


// // Create route to get log info PDF
// router.get('/api/logInfoCrypt', async (req, res) => {
//   try {
//     const allData = await logInfo.find({});
//     const decryptedData = allData.map((data) => {
//       const decryptedInfo = bcrypt.compare(data.info, req.body.info);
//       const decryptedEmail = bcrypt.compare(data.email, req.body.email);
//       const decryptedBdDate = data.bdDate; // No need to decrypt bdDate since it was not encrypted

//       return {
//         info: decryptedInfo,
//         isSentMail: data.isSentMail,
//         email: decryptedEmail,
//         bdDate: decryptedBdDate,
//       };
//     });

//     res.status(200).json(decryptedData);
//     console.log(decryptedData);
//   } catch (error) {
//     res.json(error);
//   }
// });

// router.get("/api/logInfo", async (req, res) => {
//   try {
//     const allData = await logInfo.find({});
//     const decryptedData = [];

//     allData.forEach((data) => {
//       const decryptedInfo = bcrypt.compare(req.body.info, data.info)
//         ? bcrypt.compare(req.body.info, data.info)
//         : '**********';
//       const decryptedEmail = bcrypt.compare(req.body.email, data.email)
//         ? bcrypt.compare(req.body.email, data.email)
//         : '**********';
//       const decryptedBdDate = data.bdDate;

//       decryptedData.push({
//         info: decryptedInfo,
//         isSentMail: data.isSentMail,
//         email: decryptedEmail,
//         bdDate: decryptedBdDate,
//       });
//     });

//     res.status(200).json(decryptedData);
//   } catch (error) {
//     res.json(error);
//   }
// });





router.get("/api/logInfo" , async (req,res) =>{
    try {

        const allData = await logInfo.find({});
        res.status(200).json(allData)
        console.log(allData)
    } catch (error) {
        res.json(error)

    }
})

// Decrypt function using AES
function decryptData(encryptedData, secretKey) {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

// router.get("/api/logInfoCrypt", async (req, res) => {
//   try {
//     const logInfoData = await logInfo.find({});

//     const decryptedLogInfo = logInfoData.map((item) => {
//       const decryptedInfo = decryptData(item.info, "your-secret-key");
//       return {
//         ...item.toObject(),
//         info: decryptedInfo,
//       };
//     });

//     res.status(200).json(decryptedLogInfo);
//   } catch (error) {
//     res.json(error);
//   }
// });

module.exports = router;
