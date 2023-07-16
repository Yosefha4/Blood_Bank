const mongoose = require("mongoose");

//create Schema
const DiarySchema = new mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  matchId: {
    type: String,
    require: true,
  },
  isExpired: {
    type: Boolean,
    require: true,
  },

});

module.exports = mongoose.model("diary", DiarySchema);
