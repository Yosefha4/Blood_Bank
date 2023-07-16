const router = require("express").Router();
const Calendar = require("../models/calendar");

router.post("/api/calendar", async (req, res) => {
  try {
    // Check if the combination of dayDate and chooseHour exists in the Calendar collection
    const existingCalendar = await Calendar.findOne({
      dayDate: req.body.dayDate,
      chooseHour: req.body.chooseHour,
    });

    if (existingCalendar) {
      // The combination already exists, indicating the time is busy
      return res.json("The selected time is already booked. Please choose another time.");
    }

    const newCalendar = new Calendar({
      dayDate: req.body.dayDate,
      chooseHour: req.body.chooseHour,
      userUid: req.body.userUid,
    });
    await newCalendar.save();
    console.log("The Calendar Save Correct !");
    res.status(200).json("Calendar Saved Success !");
  } catch (error) {
    res.json(error);
  }
});

router.get("/api/calendar", async (req,res) =>{
  try {
    const response = await Calendar.find({});
    res.json(response);
    console.log("Calendar Get Success !")
  } catch (error) {
    console.log("Get Calendar Went Wrong...")
  }
})

router.delete("/api/calendar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCalendar = await Calendar.findByIdAndRemove(id);
    if (deletedCalendar) {
      console.log("Calendar Deleted Successfully");
      res.status(200).json("Calendar Deleted Successfully");
    } else {
      console.log("Calendar Not Found");
      res.status(404).json("Calendar Not Found");
    }
  } catch (error) {
    console.log("Delete Calendar Error");
    res.json(error);
  }
});

module.exports = router;
