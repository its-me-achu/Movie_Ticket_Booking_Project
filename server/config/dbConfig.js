const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try{
        await mongoose.connect(
            process.env.MONGO_URI
        )
       
        console.log("Database Connected");
    } catch  (error) {
        console.log("Database Connection Failed");
    } 
};

module.exports = connectDB;


  





