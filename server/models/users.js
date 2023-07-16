const mongoose = require("mongoose");

//create Schema
const Users = new mongoose.Schema({
   fullName: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
      password: {
        type: String,
        require: true,
      },
      userType: {
        type: String,
        require: true,
      },
      userID: {
        type: String,
        require: true,
      },
      userPhone: {
        type: String,
        require: true,
      },
 
});

module.exports = mongoose.model("users", Users);
