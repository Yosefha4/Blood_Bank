const router = require("express").Router();

const newsUser = require("../models/newsUsers");



//REGISTER
router.post("/api/newsLetter", async (req, res) => {

    try {
        const isExistUser = await newsUser.findOne({ userEmail: req.body.userEmail });
        // console.log(isExistUser)
        if (isExistUser) {
          res.status(201).json({ message: "Email Already Exist!" });
          return;
        }
        const newUserNewsletter = new newsUser({
            userEmail: req.body.userEmail,
            createAt: new Date()
        }) ;
        await newUserNewsletter.save();
        res.status(200).json("NewsLetter Email add Successfully!");
        console.log("NewsLetter Email add  successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})
module.exports = router;
