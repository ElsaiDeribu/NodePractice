const express = require("express")
const http = require("http")
const mongoose = require("mongoose")
const Joi = require('joi')
const genres = require("./routes/genres")
const customers = require("./routes/customers")
const movies = require("./routes/movies")
const rentals = require("./routes/rentals")
const users = require("./routes/users")
const auth = require("./routes/auth")
const config = require("config")
const app = express()

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}



app.use(express.json())
app.use('/api/movies', movies)
app.use('/api/genres', genres)
app.use("/api/customers", customers)
app.use("/api/rentals", rentals)
app.use("/api/users", users)
app.use("/api/auth", auth)

mongoose.connect("mongodb://localhost:27017/vidlyDB").then(
    ()=> {console.log("Successfully connected to database")})
    .catch((err)=> {console.error("could not connect to the database",err)})


const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
    })