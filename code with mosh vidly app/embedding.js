const express = require("express")
const http = require("http")
const { func, required } = require("joi")
const { mongo } = require("mongoose")
const mongoose = require("mongoose")


const app = express()
app.use(express.json())


mongoose.connect("mongodb://localhost:27017/playGroundDB").then(
    ()=> {console.log("Successfully connected to database")})
    .catch((err)=> {console.error("could not connect to the database",err)})

const autorSchema = new mongoose.Schema({
    name: String,
    // bio: String,
    // website: String
})

const Author = mongoose.model('Author',autorSchema ) 


const Course = mongoose.model("Course", new mongoose.Schema({
    name: String,
    author: {
        type: autorSchema,
        required: true
    }
    
}))


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
    .select('name author')
    // console.log(result)
    result.map(c=> console.log(c._doc)) 
}

async function updateAutor(courseId){
    // const course = await Course.findById(courseId)
    // course.author.name = "yared"
    //course.save()
    const course = await Course.update({_id: courseId}, {$set: {
        'author.name' :  'yab'
    }})
    //we can use $unset in place of $set to remove a given sub-document or 
    //property *set the value to empty string or..
    
}



updateAutor('623968e34812331d247cab80')
//createCourse("Node Course", new Author({name: "elsai"}) )
listCourses()


const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
    })