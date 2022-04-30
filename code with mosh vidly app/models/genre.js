
const mongoose = require("mongoose")
const Joi = require("joi")

const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        // minlength: 3,
        // maxlength:10,
        // uppercase: true,
        // trim: true,
        // required: true,
    }
})

const Genre = mongoose.model("genre",  genreSchema)

function validateGenre(body){
    const schema = {
        name: Joi.string().min(3).required(),
    }

    return Joi.validate(body, schema)
}

exports.Genre = Genre;
exports.genreSchema = genreSchema
exports.validate = validateGenre;