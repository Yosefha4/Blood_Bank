const mongoose = require("mongoose");

//create Schema
const Donation = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  birthDay: {
    type: String,
    require: true,
  },
  donorId: {
    type: String,
    require: true,
  },
  donationDate: {
    type: String,
    require: true,
  },
  bloodType: {
    type: String,
    require: true,
  },
  isExpired: {
    type: Boolean,
    require: true,
  },
  email:{
    type:String,
    require:true
  }
});

module.exports = mongoose.model("donation", Donation);
