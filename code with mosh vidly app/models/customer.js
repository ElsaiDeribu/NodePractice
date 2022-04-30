const mongoose = require("mongoose")
const Joi = require("joi")


const customerSchema =  new mongoose.Schema({
    id:Number,
    name:{
        type: String,
        minlength: 3,
        maxlength:10,
        uppercase: true,
        trim: true,
        required: true,
    },
    isGold:{
        type: Boolean,
        default: false
    },  
    phone:{
        type: String,
        minlength: 3,
        maxlength:10,
        uppercase: true,
        trim: true,
        required: true,
    }
})


const Customer = mongoose.model("Customer", customerSchema )


function validateCustomer(body){
    const schema = {
        id:Joi.number,
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(3).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(body, schema)
}

exports.Customer = Customer;
exports.customerSchema = customerSchema
exports.validate = validateCustomer;