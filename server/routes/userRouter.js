const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const User = require("../models/users");


// Encrypt function using AES
function encryptData(data, secretKey) {
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encryptedData;
}

// Decrypt function using AES
function decryptData(encryptedData, secretKey) {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

//REGISTER
router.post("/api/register", async (req, res) => {
  try {
    const isExistUser = await User.findOne({ email: req.body.email });
    // console.log(isExistUser)
    if (isExistUser) {
      res.json({ message: "User Already Exist!" });
      return;
    }

    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // const hashedID = await bcrypt.hash(req.body.userID, salt);
    const hashedID = encryptData(req.body.userID, 'your-secret-key');
    const hashedPhone = await bcrypt.hash(req.body.userPhone, salt);

    // create new user
    const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      userType: req.body.userType,
      userID: hashedID,
      userPhone: hashedPhone,
    });

    //save user and respond
    await newUser.save();
    res.status(200).json("User Create Successfully!");
    console.log("The user created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/api/login", async (req, res) => {
  try {
    // Find user
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json({ message: "User Doesn't Exist" });
    }

    // console.log(user.password);
    // console.log(req.body.password);

    // Validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.json({ message: "User Email or Password incorrect " });
    }

    const token = jwt.sign({ id: user._id }, "sercretKey");
    res.json({ token, userID: user._id, uType: user.userType });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/api/getUser/:id", async (req, res) => {
  const userID = req.params.id;
  try {

    const currUser = await User.findById(userID);
    if (!currUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({currUser})
    // return currUser;
    
  } catch (error) {
    console.log(error)
  }
});

router.get('/api/getUserDec/:id', async (req, res) => {
  const userID = req.params.id;
  try {
    const currUser = await User.findById(userID);
    if (!currUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Decrypt the phone number
    const decryptedPhone = await bcrypt.compare(req.body.userPhone, currUser.hashedPhone);

    // If the decrypted phone matches the original phone, replace the hashedPhone with the decrypted phone
    if (decryptedPhone) {
      currUser.phone = currUser.hashedPhone; // Replace this with the actual field in your user model that stores the phone number
    } else {
      return res.status(400).json({ error: 'Phone decryption failed' });
    }

    res.json({ user: currUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Comparison route
router.get('/api/compare/:value1/:value2', (req, res) => {
  try {
    const secretKey = 'your-secret-key';

    const encryptedValue1 = req.params.value1; // Encrypted value 1
    const encryptedValue2 = req.params.value2; // Encrypted value 2

    const decryptedValue1 = decryptData(encryptedValue1, secretKey); // Decrypt value 1
    const decryptedValue2 = decryptData(encryptedValue2, secretKey); // Decrypt value 2

    // Perform comparison between decrypted values
    const areEqual = decryptedValue1 === decryptedValue2;

    res.json({ areEqual });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Decrypt route
router.get('/api/decrypt/:value1', (req, res) => {
  try {
    const secretKey = 'your-secret-key';

    const encryptedValue1 = req.params.value1; // Encrypted value 1


    const decryptedValue1 = decryptData(encryptedValue1, secretKey); // Decrypt value 1
 

    // Perform comparison between decrypted values
    // const areEqual = decryptedValue1 === decryptedValue2;

    res.json({ decryptedValue1 });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// router.get("/api/getUserForDet", async (req, res) => {
//   const userID = req.body.uID;
//   try {

//     const currUser = await User.findById(userID);
//     if (!currUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json({currUser})
//     // return currUser;
    
//   } catch (error) {
//     console.log(error)
//   }
// });

module.exports = router;
