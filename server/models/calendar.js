const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema({
  dayDate: {
    type: String,
    require: true,
  },
  chooseHour: {
    type: String,
    require: true,
  },
  userUid: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("calendar", CalendarSchema);
