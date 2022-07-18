import express, { response } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import {User} from "../models/user.js"
import cors from "cors"
dotenv.config()

const app = express()
const router = express.Router()
app.use(express.json()) // To get the posted data (req.body)
app.use(cors())


// Build Connection String 
const mongoDbConString = `mongodb://${process.env.MONGODB_SERVER}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`
// Connect to DB
mongoose.connect(mongoDbConString)
    .then(() => console.log("Connected to mongoDB successfully"))
    .catch(err => console.log(err))

router.get("/", (req, res) => {
    res.json("Welcome to UserAPI using MongoDB")
})

router.get("/users", async(req, res) => {
    const users = await User.find()
    res.json(users)
})


router.post("/register", (req, res) => {
    const {username, email, password} = req.body
    const salt = parseInt(process.env.PASSWORD_SALT)
    bcrypt.hash(password, salt, async(err, hash) => {
        if(err) {
            throw err
        }
        const user = new User({
            username,
            email, 
            password: hash
        })
        const output = await user.save()
        res.json({isUserRegistered: true, message: `${output.username} registered successfully`})
    })
})

router.post("/login",  async (req, res) => {
    const {username, password} = req.body
    const user = await User.find({username})
    //
    if(user.length > 0){
        bcrypt.compare(password, user[0].password, function(err, bcryptResponse) {
            if(err){
                res.status(500).send(err)
            }
            if(bcryptResponse){
                res.json({isValidLogin: true, message: "Loggedin Sucessfully"})
            } else {
                res.status(500).send("Invalid login")
            }
        });
    } else {
        res.status(500).send("Invalid login")
    }
})


router.put("/users/:id", (req, res) => {
    const userId = req.params.id
    const {username, email, password} = req.body
    
    const salt = parseInt(process.env.PASSWORD_SALT)
    bcrypt.hash(password, salt, async(err, hash) => {
        const user = {
            username,
            email, 
            password: hash
        }
        const output = await User.updateOne({_id: userId}, user)
        res.json(`User : ${user.username} Updated successfully`)
    })
})

router.delete("/users/:id", async(req, res) => {
    const userId = req.params.id
    const output = await User.deleteOne({_id: userId})
    res.json(output)
})

const PORT = process.env.PORT || 3001

app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`)
})