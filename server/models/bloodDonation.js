const mongoose = require("mongoose");

//create Schema
const Donation = new mongoose.Schema({
  name: {
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
});

module.exports = mongoose.model("donation", Donation);
