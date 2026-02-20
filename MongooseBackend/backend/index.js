const express=  require('express');
const mongoose = require('mongoose');  //database connection
const Employee = require('./models/employee');
const employeeRoutes = require("./routes/employeeRoutes");
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());    //to parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is now Connected"))
  .catch((err) => console.log(err));

  
app.use("/api", employeeRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});