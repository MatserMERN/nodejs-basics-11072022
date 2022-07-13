import express from "express"
import mongoose from "mongoose"
const app = express()

// mongoose.connect("mongodb://localhost:27017/studentdb")
//     .then(() => console.log(`connected to database successfully !!!`))
//     .catch(err => console.log(err))

mongoose.connect("mongodb://localhost:27017/studentdb", (err) => {
    if(err){
        throw err
    } else {
        console.log(`Connected to mongoDB successfully`)
    }
})

app.get("/", (request, response) => {
    response.json("Creating an API using Es6 Import")
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})