
const express = require("express")
const bodyParser = require("body-parser");
const connectDB = require("./config/dbConfig");
const cors = require("cors");
const usersRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");
const theatreRoute = require("./routes/theatreRoute");
const bookingsRoute = require("./routes/bookingsRoute");


require("dotenv").config();

const app = express();

//Middleware:
app.use(cors());
app.use(express.json()); 

//Connect to MongoDb:
connectDB();

//Routes: 
app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute); 
app.use("/api/theatres", theatreRoute);
app.use("/api/bookings", bookingsRoute);


const PORT = process.env.PORT || 5000;
//const PORT = 2000;
app.listen(PORT, ()=>{
    console.log(`Server is Running on the port ${PORT}`);
});
