import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {versionKey: false})

export const User = mongoose.model("user", userSchema, "user")