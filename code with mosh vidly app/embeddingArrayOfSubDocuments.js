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
    authors: [autorSchema]
    
}))


async function createCourse(name, authors){
    const newCourse = new Course({
        authors: authors,
        name: name,
    })

    const result = await newCourse.save()
    console.log(result._doc)
}

async function addAutor(courseId, author){
    const course = await Course.findById(courseId)
    course.authors.push(author)
    course.save()
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId)
    const author = course.authors.id(authorId)
    author.remove()
    course.save()


}
async function listCourses(){
    const result = await Course
    .find({})
    .select('name authors')
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

removeAuthor("62397311946673186459a224","62397474dc06573b808f5409" )
//addAutor("62397311946673186459a224", new Author({name: "yab"}))
//updateAutor('623968e34812331d247cab80')
//createCourse("Node Course", [new Author({name: "elsai"}), new Author ({name: 'yared'} )])
listCourses()


const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
    })