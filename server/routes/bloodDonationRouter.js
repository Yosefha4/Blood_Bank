const router = require("express").Router();

//import donation model
const bloodDonation = require("../models/bloodDonation");

//create the first route --> the "add" router
router.post("/api/donation", async (req, res) => {
  try {
    const newDonation = new bloodDonation({
      name: req.body.name,
      donorId: req.body.donorId,
      donationDate: new Date().toDateString(),
      bloodType: req.body.bloodType,
    });

    const saveDonation = await newDonation.save();
    res.status(200).json("Donation Added Successfully. Thank You!");
  } catch (error) {
    res.json(error);
  }
});

//create second route --> the "get" data from database
router.get('/api/donation', async (req,res)=>{
    try {

        const donation = await bloodDonation.find({});
        res.status(200).json(donation)
        
    } catch (error) {
        res.json(error)
    }
})


// //update item(counter)
router.get('/api/donation/:bloodType', async(req,res)=>{
    try {
      const donationsByType = await bloodDonation.find({bloodType: req.params.bloodType});
      console.log(donationsByType)
        
    } catch (error) {
        res.json(error)
    }
})


//delete from db()
router.delete('/api/donation/:bloodType' , async(req,res)=>{
    try {
//find the item we want and delete it
const deleteItem = await bloodDonation.findOneAndDelete({bloodType: req.params.bloodType})
if(deleteItem){
  res.status(200).json("Item Deleted . The donate : " + deleteItem)
}
else{
  console.log("first")
}

        
    } catch (error) {
        res.json(error)
    }
})


module.exports = router;
