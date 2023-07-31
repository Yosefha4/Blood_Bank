const mongoose = require("mongoose");

//create Schema
const NewsUsers = new mongoose.Schema({
  userEmail: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("newsLetterUsers", NewsUsers);
