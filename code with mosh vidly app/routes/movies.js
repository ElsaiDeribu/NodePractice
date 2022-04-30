const {Movie /*,validate*/} = require("../models/movie")
const{Genre} = require('../models/genre')
const mongoose = require("mongoose")
const express = require('express')
const Joi = require("joi")
const router = express.Router()


router.get("/", async(req, res) => {
    const result = await Movie.find().sort('title')
    res.send(result) 
    });


router.get("/:id", async(req, res) => {
    const result = await Movie.find({_id:req.params.id})
    if(!result) return res.status(404).send("genre with this id could not be found ")
    res.send(result) 
})


router.post("/", async(req, res) => {
    // const{error} = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("invalid customer")

    const newMovie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        } ,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    const result = await newMovie.save()
    res.send(result)

})


router.put("/:id", async(req, res) => {
    // const{error} = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message)

    const result = await Movie.update({_id:parseInt(req.params.id)}, {
        $set: {
            title: req.body.title,
            genre: req.body.genre,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
            }})

    if(!result) return res.status(404).send("genre with this id could not be found ")
    res.send(result)
})


router.delete("/:id", async(req, res) => {
    const result = await Movie.deleteOne({_id:Number(req.params.id)})
    if(!result) return res.status(404).send("genre with this id could not be found ")
    res.send(result)
})


module.exports = router;

