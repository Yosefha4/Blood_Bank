const router = require("express").Router();
const diary = require("../models/diary");

router.post("/api/diary", async (req, res) => {
  try {
    const { date ,matchId} = req.body;

    const newDiary = new diary({
      date: date,
     
      matchId: matchId,
      isExpired: false,
    });
    await newDiary.save();
    res.status(200).json("Diary date added successfully");
  } catch (error) {
    res.json(error);
  }
});

router.get("/diary/:donorId", async (req, res) => {
  try {
    const { donorId } = req.params;
    const diaryEntries = await diary.find({ donorId });
    res.json(diaryEntries);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// Update a diary entry
router.put("/diary/:entryId", async (req, res) => {
  try {
    const { entryId } = req.params;
    const updatedEntry = await diary.findByIdAndUpdate(entryId, req.body, {
      isExpired: true,
    });
    res.json(updatedEntry);
  } catch (error) {
    console.error(error);
    res.status(eroor);
  }
});

module.exports = router;
