const mongoose = require("mongoose")
const express = require('express')
const Joi = require("joi")
const router = express.Router()
const {Rental, validate} = require ("../models/rental") 
const { Customer } = require("../models/customer")
const {Movie} = require ("../models/movie")
const Fawn = require("fawn")
const { object } = require("joi")


Fawn.init(mongoose)


router.get("/", async(req, res) => {
    const result = await Rental.find().sort('name')
    res.send(result) 
    });


router.get("/:id", async(req, res) => {
    const result = await Rental.find({_id:req.params.id})

    if(!result) return res.status(404).send("rental with this id could not be found ")
    res.send(result) 
})


router.post("/", async(req, res) => {
    // const{error} = validateRental(req.body);
    // if(error) return res.status(400).send(error.details[0].message)
    if ( !mongoose.Types.ObjectId.isValid(req.body.customerId)){
        return res.status(400).send("invalid customer id")
    }
//instead use the joi-objectId validator to validate objectId
    if ( !mongoose.Types.ObjectId.isValid(req.body.movieId)){
        return res.status(400).send("invalid movie id")
    }

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send("invalid customer")

    const movie = await Movie.findById(req.body.movieId)
    if(!movie) return res.status(400).send('Invalid movie')

    if (movie.numberInStock == 0) return res.status(400).send("movie is not in stock")


    const newRental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })
try{
    new Fawn.Task()
        .save('rentals', newRental)
        .update('movies', {_id: movie._id}, {
            $inc: {numberInStock: -1}
        })
        .run()

    res.send(newRental)
}
catch(ex){ res.status(500).send("something failed")}

    // const result = await newRental.save()
    // movie.numberInStock--;
    // movie.save()

})


router.put("/:id", async(req, res) => {
    // const{error} = validateRental(req.body);
    // if(error) return res.status(400).send(error.details[0].message)


    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send("invalid customer")

    const movie = await Movie.findById(req.body.movieId)
    if(!movie) return res.status(400).send('Invalid movie')



    const result = await Rental.update({_id:req.params.id}, {
        $set: {
                customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
            }})

    if(!result) return res.status(404).send("rental with this id could not be found ")
    res.send(result)
})


router.delete("/:id", async(req, res) => {
    const result = await Rental.deleteOne({_id:req.params.id})
    if(!result) return res.status(404).send("rental with this id could not be found ")
    res.send(result)
})


module.exports = router;

