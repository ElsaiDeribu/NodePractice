const {Customer/*,validate*/} = require("../models/customer")
const mongoose = require("mongoose")
const express = require('express')
const Joi = require("joi")
const router = express.Router()


router.get("/", async(req, res) => {
    const result = await Customer.find().sort('name')
    res.send(result) 
    });


router.get("/:id", async(req, res) => {
    const result = await Customer.find({id:req.params.id})

    if(!result) return res.status(404).send("genre with this id could not be found ")
    res.send(result) 
})


router.post("/", async(req, res) => {
    // const{error} = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message)

    const newCustomer = new Customer({
        id:parseInt(req.body.id),
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    const result = await newCustomer.save()
    res.send(result)

})


router.put("/:id", async(req, res) => {
    // const{error} = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message)

    const result = await Customer.update({id:parseInt(req.params.id)}, {
        $set: {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
            }})

    if(!result) return res.status(404).send("genre with this id could not be found ")
    res.send(result)
})


router.delete("/:id", async(req, res) => {
    const result = await Customer.deleteOne({id:Number(req.params.id)})
    if(!result) return res.status(404).send("genre with this id could not be found ")
    res.send(result)
})


module.exports = router;

