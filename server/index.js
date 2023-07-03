const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

//Port
const PORT = process.env.PORT || 5500;

//Use express.json() to get data into json format
app.use(express.json());

// app.use(bodyParser.json())
//use cors
app.use(cors());

//import routes
const DonationRoute = require("./routes/bloodDonationRouter");
const LogInfoRoute = require("./routes/logInfoRouter");
const userRouter = require("./routes/userRouter");
const emailRouter = require("./routes/emailRoute")
// const bodyParser = require("body-parser");

//Connect to mongodb
mongoose
  .connect(process.env.DB_CONNECT_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

//use route
app.use("/", DonationRoute);
app.use("/", LogInfoRoute);
app.use("/", userRouter);
app.use("/",emailRouter)

app.listen(PORT, () => {
  console.log("Server connected");
});
