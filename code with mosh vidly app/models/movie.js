
const {genreSchema /*, validate*/} = require ("./genre") 
const mongoose = require("mongoose")
const Joi = require("joi")


const movieSchema =  new mongoose.Schema({
    title: String,
    genre: {
        type: genreSchema
    },
    numberInStock: Number,
    dailyRentalRate: Number

})

const Movie = mongoose.model("Movies", movieSchema )


function validateMovie(body){
    const schema = {
        id:Joi.number()
    }

    return Joi.validate(body, schema)
}

exports.Movie = Movie;
exports.movieSchema = movieSchema
exports.validate = validateMovie;