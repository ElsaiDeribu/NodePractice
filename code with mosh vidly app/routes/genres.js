const mongoose = require("mongoose")
const express = require('express')
const Joi = require("joi")
const router = express.Router()
const {Genre, validate} = require ("../models/genre") 


router.get("/", async(req, res) => {
    const result = await Genre.find().sort('name')
    res.send(result) 
    });


router.get("/:id", async(req, res) => {
    const result = await Genre.find({_id:req.params.id})

    if(!result) return res.status(404).send("genre with this id could not be found ")
    res.send(result) 
})


router.post("/", async(req, res) => {
    // const{error} = validateGenre(req.body);
    // if(error) return res.status(400).send(error.details[0].message)

    const newGenre = new Genre({
        name: req.body.name
    })
    const result = await newGenre.save()
    res.send(result)
})


router.put("/:id", async(req, res) => {
    // const{error} = validateGenre(req.body);
    // if(error) return res.status(400).send(error.details[0].message)

    const result = await Genre.update({_id:parseInt(req.params.id)}, {
        $set: {
            name: req.body.name
            }})

    if(!result) return res.status(404).send("genre with this id could not be found ")
    res.send(result)
})


router.delete("/:id", async(req, res) => {
    const result = await Genre.deleteOne({_id:Number(req.params.id)})
    if(!result) return res.status(404).send("genre with this id could not be found ")
    res.send(result)
})


module.exports = router;

