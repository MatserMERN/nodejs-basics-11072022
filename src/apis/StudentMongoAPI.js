import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"

import {
    Student,
    getStudents,
    getStudentByText,
    createStudent,
    updateStudent,
    deleteStudent
} from "../models/student.js"

const app = express()
const router = express.Router()
dotenv.config()

app.use(express.json()) // To get the posted data (req.body)
app.use(cors())

// Build Connection String 

const mongoDbConString = `mongodb://${process.env.MONGODB_SERVER}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`
// Connect to DB
mongoose.connect(mongoDbConString, (err) => {
    if (err) {
        throw err
    } else {
        console.log(`Connected to MongoDB Successfully !!!`)
    }
})

router.get("/", (req, res) => {
    res.json("Welcome to Student API using MongoDB")
})

router.get("/students", (req, res) => {
    getStudents(function (err, data) {
        if (err) {
            throw err
        }
        res.json(data)
    })
})

// router.get("/students/:id", (req, res) => {
//     const studentId = req.params.id
//     getStudentById(studentId, (err, data) => {
//         if(err){
//             throw err
//         }
//         res.json(data)
//     })
// })

router.get("/students/:text", (req, res) => {
    const text = req.params.text
    getStudentByText(text, (err, data) => {
        if (err) {
            throw err
        }
        res.json(data)
    })
})

router.post("/students", (req, res) => {
    const student = req.body
    try{
        createStudent(student, (err, data) => {
            console.log(err)
            if (err) {
                 res.status(500).send(err)
            }
            res.json(data)
        })
    } catch(ex){
        res.status(500).send(ex)
    }

})

router.put("/students/:id", (req, res) => {
    const studentId = req.params.id
    const student = req.body
    updateStudent(studentId, student, (err, data) => {
        if(err){
            throw err
        }
        res.json(data)
    })
})

router.delete("/students/:id", (req, res) => {
    const studentId = req.params.id
    deleteStudent(studentId, (err, data) => {
        if(err){
            throw err
        }
        res.json(data)
    })
})


const PORT = process.env.PORT || 3001

app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT} `)
})