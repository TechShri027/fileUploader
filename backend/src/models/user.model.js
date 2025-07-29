import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
         type: String,
        required: true,
        unique: true
    },
    password:{
         type: String,
        required: true
    },
    dob:{
        type : Date,
        required: true
    },
    profilePic:{
        type: String
    }

},{timestamps:true})

export const  User=mongoose.model("User", userSchema)