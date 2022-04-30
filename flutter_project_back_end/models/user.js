const mongoose = require("mongoose")


const User = mongoose.model("User",  new mongoose.Schema({
    name:  {
        type: String,
        requried: true,
        minlength: 5,
        maxlength:50
    },
    email:  {
        type: String,
        requried: true,
        minlength: 5,
        maxlength:50,
        unique: true
    },
    password:  {
        type: String,
        requried: true,
        minlength: 5,
        maxlength:5000,
    },

})
)


exports.User = User;