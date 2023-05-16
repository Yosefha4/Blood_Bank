const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

//Use express.json() to get data into json format
app.use(express.json());

//Port
const PORT = process.env.PORT || 5500;

//use cors
app.use(cors());

//import routes
const DonationRoute = require("./routes/bloodDonationRouter");
const LogInfoRoute = require("./routes/logInfoRouter");

//Connect to mongodb
mongoose
  .connect(process.env.DB_CONNECT_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

//use route
app.use("/", DonationRoute);
app.use("/", LogInfoRoute);

app.listen(PORT, () => {
  console.log("Server connected");
});
