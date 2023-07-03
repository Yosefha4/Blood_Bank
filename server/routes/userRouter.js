const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

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

    //create new user
    const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      userType: req.body.userType,
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

module.exports = router;
