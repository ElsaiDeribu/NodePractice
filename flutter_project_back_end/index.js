const express = require("express")
const mongoose = require("mongoose")
const User = require("./routes/user")
const app = express()


app.use(express.json())
app.use('/api/user', User)





mongoose.connect("mongodb://localhost:27017/jobHouseDB").then(
    ()=> {console.log("Successfully connected to database")})
    .catch((err)=> {console.error("could not connect to the database",err)})



const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
    })