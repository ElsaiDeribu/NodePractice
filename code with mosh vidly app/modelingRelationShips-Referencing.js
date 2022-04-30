const express = require("express")
const http = require("http")
const { mongo } = require("mongoose")
const mongoose = require("mongoose")


const app = express()
app.use(express.json())


mongoose.connect("mongodb://localhost:27017/playGroundDB").then(
    ()=> {console.log("Successfully connected to database")})
    .catch((err)=> {console.error("could not connect to the database",err)})


const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
})) 


const Course = mongoose.model("Course", new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Author'
    }
}))


async function createAuthor(name, bio, website){
    const newAutor = new Author({
        name: name,
        bio: bio,
        website: website
    })

const result = await newAutor.save()
console.log(result._doc)
}


async function createCourse(name, author){
    const newCourse = new Course({
        author: author,
        name: name,
    })

    const result = await newCourse.save()
    console.log(result._doc)
}


async function listCourses(){
    const result = await Course
    .find({})
    .populate('author ', ' name -_id')
    .select('name author')
    // console.log(result)
    result.map(c=> console.log(c._doc)) 
}


//createAuthor("elsai", "my bio", "my website")
//createCourse("Node Course", "62395f991d888544cc540018")
listCourses()


const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
    })