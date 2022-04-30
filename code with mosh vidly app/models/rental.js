
const mongoose = require("mongoose")
const Joi = require("joi")
const {movieSchema} = require("./movie")
const {customerSchema} = require("./customer")
const { required } = require("joi")

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
                name: String,
                phone: String
            }),
        required: true
        },
    
    movie: {
        type: new mongoose.Schema({
            title: String,
            dailyRentalRate: Number 
    }),
            required: true
    },
    dateOut:{
        type: Date,
        required: true,
        default: Date.now

    },
    dateReturned:{
        type: Date,
    },
    rentalFee:{
        type: Number,
    }
})

const Rental = mongoose.model("Rental",  rentalSchema)

function validateRental(body){
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().min(3).required(),
    }

    return Joi.validate(body, schema)
}

exports.Rental = Rental;
exports.rentalSchema = rentalSchema
exports.validate = validateRental;