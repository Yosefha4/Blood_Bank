const router = require("express").Router();

const logInfo = require("../models/logInfo");

router.post("/api/logInfo", async (req, res) => {
  try {
    const newLogInfo = new logInfo({
      info: req.body.info,
    });

    const saveInfo = await newLogInfo.save();
    res.status(200).json("Log Information Added Successfully.");
  } catch (error) {
    res.json(error);
  }
});

router.get("/api/logInfo" , async (req,res) =>{
    try {

        const allData = await logInfo.find({});
        res.status(200).json(allData)
        console.log(allData)
    } catch (error) {
        res.json(error)

    }
})

module.exports = router;
