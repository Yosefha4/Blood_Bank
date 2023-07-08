const logInfo = require("../models/logInfo");
const sendEmail = require("../utils/sendEmail");
const cron = require('node-cron');

const router = require("express").Router();

router.post("/api/sendMail", async (req, res) => {
  const { email,emailMessage } = req.body;

  try {
    const sendTo = email;
    const sendFrom = process.env.EMAIL_USER;
    const subject = "Blood Bank!";
    // Design the message with styles
    const message = `
      <h3 style="color: #ff0000;">Hello User</h3>
    
      <p style="font-size: 16px;">We wanted to remind you that in exactly one week you will be able to donate blood again to our blood bank system! We will be happy if you make an appointment/arrive as soon as possible.</p>
      <img src="https://health.gov.tt/sites/default/files/styles/large/public/inline-images/Blood%20Bank%20logo%202022-03.png?itok=0H-a6QNb" alt="Blood Bank Image" width="200" height="120" >
      <p style="font-style: italic;">Regards, 'Blood Bank SCE'</p>


      `;

    await sendEmail(subject, emailMessage, sendTo, sendFrom);
    res.status(200).json({ success: true, message: "Email Sent Success !" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Function to send reminder emails
async function sendReminderEmails() {
    try {
      const currentDate = new Date();
      const elevenWeeksAgo = new Date();
      elevenWeeksAgo.setDate(currentDate.getDate() - 77); // 77 days in 11 weeks
  
      // Find the logInfo records that meet the criteria
      const logInfos = await logInfo.find({
        email: { $exists: true },
        isSentMail: false,
      });
  
      // Loop through the logInfo records and send reminder emails
      for (const logInfo of logInfos) {
        const { email, bdDate } = logInfo;
        const parsedBdDate = new Date(bdDate);
  
        if (parsedBdDate <= elevenWeeksAgo) {
          // Send the reminder email using the same code as in the "/api/sendMail" route
          const sendTo = email;
          const sendFrom = process.env.EMAIL_USER;
          const subject = "Reminder - The Blood Bank!";
          const message = `
          <h3 style="color: #ff0000;">Hello !</h3>
          <p style="font-size: 16px;">We wanted to remind you that in exactly one week you will be able to donate blood again to our blood bank system! We will be happy if you make an appointment/arrive as soon as possible.</p>
          <img src="https://health.gov.tt/sites/default/files/styles/large/public/inline-images/Blood%20Bank%20logo%202022-03.png?itok=0H-a6QNb" alt="Blood Bank Image" width="200" height="120" >
          <p style="font-style: italic;">Regards, 'Blood Bank SCE'</p>
        `;
  
          await sendEmail(subject, message, sendTo, sendFrom);
  
          // Update the isSentMail flag to true
          logInfo.isSentMail = true;
          await logInfo.save();
        }
      }
  
      console.log('Reminder emails sent successfully!');
    } catch (error) {
      console.error('Error sending reminder emails:', error);
    }
  }

// Schedule the task to run every day at a specific time (e.g., 8:00 AM)
cron.schedule('0 8 * * *', async () => {
    try {
      // Call the function to send reminder emails
      await sendReminderEmails();
      console.log("runing  sendReminderEmails func !")
    } catch (error) {
      console.error('Error scheduling reminder emails:', error);
    }
  });

// Route for sending reminder emails
// router.post("/api/sendReminderEmails", async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const elevenWeeksAgo = new Date();
//     elevenWeeksAgo.setDate(currentDate.getDate() - 77); // 77 days in 11 weeks

//     // Find the logInfo records that meet the criteria
//     const logInfos = await logInfo.find({
//       email: { $exists: true },
     
//       isSentMail: false,
//     });

//     // Loop through the logInfo records and send reminder emails
//     for (const logInfo of logInfos) {
//       // console.log(logInfo)
//       const { email, bdDate } = logInfo;
//       const parsedBdDate = new Date(bdDate);

//       if (parsedBdDate <= elevenWeeksAgo) {

//       // Send the reminder email using the same code as in the "/api/sendMail" route
//       const sendTo = email;
//       const sendFrom = process.env.EMAIL_USER;
//       const subject = "Reminder - The Blood Bank!";
//       const message = `
//           <h3 style="color: #ff0000;">Hello !</h3>
//           <p style="font-size: 16px;">We wanted to remind you that in exactly one week you will be able to donate blood again to our blood bank system! We will be happy if you make an appointment/arrive as soon as possible.</p>
//           <img src="https://health.gov.tt/sites/default/files/styles/large/public/inline-images/Blood%20Bank%20logo%202022-03.png?itok=0H-a6QNb" alt="Blood Bank Image" width="200" height="120" >
//           <p style="font-style: italic;">Regards, 'Blood Bank SCE'</p>
//         `;

//       await sendEmail(subject, message, sendTo, sendFrom);

//       // Update the isSentMail flag to true
//       logInfo.isSentMail = true;
//       await logInfo.save();
//     }
//     }
//     res
//       .status(200)
//       .json({ success: true, message: "Reminder emails sent successfully!" });
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// });

module.exports = router;
