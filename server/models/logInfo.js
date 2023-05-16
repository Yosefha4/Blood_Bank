const mongoose = require("mongoose");

//create Schema
const LogInfo = new mongoose.Schema({
  info: {
    type: String,
    require: true,
  },
 
});

module.exports = mongoose.model("logInfo", LogInfo);
