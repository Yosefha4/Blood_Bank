# Blood Bank Application
The Blood Bank web application is a comprehensive platform that streamlines blood donation and supply management. It provides an intuitive user interface for donors to easily register, schedule appointments, and access their donation history. Additionally, administrators benefit from a robust management interface to oversee inventory, track donations, handle requests, and generate reports. The application ensures efficient blood supply distribution, fostering a seamless process for both donors and healthcare facilities.


[[Blood Bank Application Video]](https://www.youtube.com/watch?v=8GXDdk_PLfs)




# Blood Bank Management Interface


   ### Blood Donation
 
   * Users can donate blood units by providing their relevant information.
 
  ### Blood Requests
 
   * Users who need blood can submit requests, specifying blood type, quantity and urgency.
   * Users can request blood in an emergency.
 
  ### Blood Supply Management
  
   * The application maintains an inventory of available blood units, categorized by blood type.
   * Donated blood units are recorded and added to the inventory.
 
  ### Data Export to PDF
 
   * Users can generate PDF reports containing detailed information about blood donations, requests, and inventory.
   * The exported reports can be used for analysis, documentation, or sharing with stakeholders.

# Donor User Interface

 * A new interface designed specifically for blood donors.
 * Provides a personalized experience and features tailored to donors' needs.
 * Donors have individual profile pages to manage their personal information, including contact details and medical history.
 * Access to a complete blood donation history, allowing donors to track and review their past donations.
 * Donation Diary feature enables donors to schedule and set dates for upcoming blood donations using an intuitive calendar interface.
 * Automatic email notifications sent immediately after donation to express gratitude and acknowledge the donor's contribution.
 * Reminder emails sent approximately one week before the next eligible donation date, encouraging continued support.



 
 # Technologies Used
  The Blood Bank web application is built using the following technologies:
 
   * React.js: A JavaScript library for building user interfaces.
   * Node.js: A JavaScript runtime environment for server-side development.
   * Express.js: A web application framework for Node.js.
   * MongoDB: A NoSQL database for storing application data.
   * PDF libraries (@react-pdf/renderer): Used for generating PDF reports.

---

# Operating Instructions

## Server

### Prerequisites
Before running the server for the Blood Bank Application, make sure you have the following installed:

- Node.js: Install Node.js from the official website: [https://nodejs.org](https://nodejs.org)
- MongoDB: Install MongoDB from the official website: [https://www.mongodb.com](https://www.mongodb.com)

### Installation
1. Clone the repository to your local machine using the following command:
   ```
   git clone <repository-url>
   ```

2. Navigate to the server folder:
   ```
   cd blood-bank-application/server
   ```

3. Install the dependencies using npm:
   ```
   npm install
   ```

### Configuration
1. Open the `.env` file in the server folder.

2. Provide the necessary configuration values:
   - `MONGODB_URI`: The URI of your MongoDB database.
   - `PORT`: The port number on which the server will run (default is 3000).

### Usage
1. Start the server:
   ```
   npm start
   ```
   or
   ```
   node index.js
   ```

2. The server will start running and listen for incoming requests.

## Client

### Prerequisites
Before running the client for the Blood Bank Application, make sure you have the following installed:

- Node.js: Install Node.js from the official website: [https://nodejs.org](https://nodejs.org)

### Installation
1. Clone the repository to your local machine using the following command:
   ```
   git clone <repository-url>
   ```

2. Navigate to the client folder:
   ```
   cd blood-bank-application/client
   ```

3. Install the dependencies using npm:
   ```
   npm install
   ```

### Usage
1. Start the client development server:
   ```
   npm start
   ```

2. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the Blood Bank Application.

---

Make sure to replace `<repository-url>` with the actual URL of your repository.

Feel free to modify and expand upon these instructions based on your specific setup and requirements.
