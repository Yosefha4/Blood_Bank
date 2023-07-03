const mongoose = require("mongoose");

//create Schema
const LogInfo = new mongoose.Schema({
  info: {
    type: String,
    require: true,
  },
  isSentMail: {
    type: Boolean,
    require: false,
  },
  email: {
    type: String,
    require: false,
  },
  bdDate: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("logInfo", LogInfo);
