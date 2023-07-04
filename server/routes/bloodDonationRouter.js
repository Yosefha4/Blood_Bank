const router = require("express").Router();
const bcrypt = require('bcrypt');

//import donation model
const bloodDonation = require("../models/bloodDonation");


//create the first route --> the "add" router
router.post("/api/donation", async (req, res) => {
  try {
    const newDonation = new bloodDonation({
      name: req.body.name,
      address: req.body.address,
      birthDay: req.body.birthDay,
      donorId: req.body.donorId,
      donationDate: new Date().toDateString(),
      bloodType: req.body.bloodType,
      email: req.body.email,
      isExpired: false,
    });

    const saveDonation = await newDonation.save();
    res.status(200).json("Donation Added Successfully. Thank You!");
  } catch (error) {
    res.json(error);
  }
});

// //create the first route --> the "add" router
// router.post("/api/donation", async (req, res) => {
//   try {
//     const encryptedName = await bcrypt.hash(req.body.name, 10);
//     const encryptedAddress = await bcrypt.hash(req.body.address, 10);
//     const encryptedBirthDay = await bcrypt.hash(req.body.birthDay, 10);
//     const encryptedDonorId = await bcrypt.hash(req.body.donorId, 10);
//     const encryptedEmail = await bcrypt.hash(req.body.email, 10);
    
//     const newDonation = new bloodDonation({
//       name: encryptedName,
//       address: encryptedAddress,
//       birthDay: encryptedBirthDay,
//       donorId: encryptedDonorId,
//       donationDate: new Date().toDateString(),
//       bloodType: req.body.bloodType,
//       email: encryptedEmail,
//       isExpired: false,
//     });

//     const saveDonation = await newDonation.save();
//     res.status(200).json("Donation Added Successfully. Thank You!");
//   } catch (error) {
//     res.json(error);
//   }
// });

// // Create route to get donation data
// router.get('/api/donation', async (req, res) => {
//   try {
//     const donations = await bloodDonation.find({});

//     const decryptedDonations = donations.map((donation) => {
//       return {
//         name: bcrypt.compareSync(req.body.name, donation.name) ? req.body.name : '**********',
//         address: bcrypt.compareSync(req.body.address, donation.address) ? req.body.address : '**********',
//         birthDay: bcrypt.compareSync(req.body.birthDay, donation.birthDay) ? req.body.birthDay : '**********',
//         donorId: bcrypt.compareSync(req.body.donorId, donation.donorId) ? req.body.donorId : '**********',
//         donationDate: donation.donationDate,
//         bloodType: bcrypt.compareSync(req.body.bloodType, donation.bloodType) ? req.body.bloodType : '**********',
//         email: bcrypt.compareSync(req.body.email, donation.email) ? req.body.email : '**********',
//         isExpired: donation.isExpired,
//       };
//     });

//     res.status(200).json(decryptedDonations);
//   } catch (error) {
//     res.json(error);
//   }
// });

//create second route --> the "get" data from database
router.get("/api/donation", async (req, res) => {
  try {
    const donation = await bloodDonation.find({});
    res.status(200).json(donation);
  } catch (error) {
    res.json(error);
  }
});

// //update item(counter)
router.get("/api/donation/:bloodType", async (req, res) => {
  try {
    const donationsByType = await bloodDonation.find({
      bloodType: req.params.bloodType,
    });
    console.log(donationsByType);
  } catch (error) {
    res.json(error);
  }
});

// //delete from db() by blood type
// router.delete("/api/donation/:bloodType", async (req, res) => {
//   try {
//     //find the item we want and delete it
//     const deleteItem = await bloodDonation.findOneAndDelete({
//       bloodType: req.params.bloodType,
//     });
//     if (deleteItem) {
//       // Decrypt the sensitive fields before sending the response
//       const decryptedItem = {
//         name: bcrypt.compareSync(deleteItem.name, req.body.name) ? req.body.name : '**********',
//         address: bcrypt.compareSync(deleteItem.address, req.body.address) ? req.body.address : '**********',
//         birthDay: bcrypt.compareSync(deleteItem.birthDay, req.body.birthDay) ? req.body.birthDay : '**********',
//         donorId: bcrypt.compareSync(deleteItem.donorId, req.body.donorId) ? req.body.donorId : '**********',
//         donationDate: deleteItem.donationDate,
//         bloodType: bcrypt.compareSync(deleteItem.bloodType, req.body.bloodType) ? req.body.bloodType : '**********',
//         email: bcrypt.compareSync(deleteItem.email, req.body.email) ? req.body.email : '**********',
//         isExpired: deleteItem.isExpired,
//       };
//       res.status(200).json("Item Deleted . The donate : " + decryptedItem);

//     }
//     // if (deleteItem) {
//     //   res.status(200).json("Item Deleted . The donate : " + deleteItem);
//     // } 
//     else {
//       console.log("Dont find item to delete .");
//     }
//   } catch (error) {
//     res.json(error);
//   }
// });
//delete from db() by blood type
router.delete("/api/donation/:bloodType", async (req, res) => {
  try {
    //find the item we want and delete it
    const deleteItem = await bloodDonation.findOneAndDelete({
      bloodType: req.params.bloodType,
    });
    if (deleteItem) {
      res.status(200).json("Item Deleted . The donate : " + deleteItem);
    } else {
      console.log("first");
    }
  } catch (error) {
    res.json(error);
  }
});
//delete from db() by id
router.delete("/api/donation/id/:id", async (req, res) => {
  const donationId = req.params.id;
  try {
    //find the item we want and delete it
    const deleteItem = await bloodDonation.findByIdAndDelete(donationId);
    if (deleteItem) {
      res.status(200).json("Item Deleted . The donate : " + deleteItem);
    } else {
      console.log("deleted item Error");
    }
  } catch (error) {
    res.json(error);
  }
});

router.put("/api/donation/:id", async (req, res) => {
  const donationId = req.params.id;

  try {
    // Perform the database update operation based on the donationId
    // Update the isExpired field to true

    // Example using Mongoose
    const donation = await bloodDonation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    donation.isExpired = true;
    await donation.save();

    res.sendStatus(200); // or res.sendStatus(204) for no content
  } catch (error) {
    console.error("Error occurred while updating donation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
