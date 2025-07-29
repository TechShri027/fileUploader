import {User} from '../models/user.model.js'
import bcrypt from 'bcrypt'
import cloudinary from '../config/cloudinary.js'
import jwt from 'jsonwebtoken'
import streamifier from 'streamifier';



const register=async(req, res)=>{
const {userName, email, password, confirmPassword, dob}=req.body
const file=req.file
try {
    if(!userName || !email || !password || !confirmPassword || !dob){
        return res.status(401).json({message:"all fields must be required"})
    }

    if(password !== confirmPassword ){
        return res.status(401).json({message:"password must be same"})
    }

    const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(401).json({message:"user already exists"})
    }

    const hashedPassword=await bcrypt.hash(password, 10)

    let result={}

    if(file){
        result=await new Promise((resolve, reject)=>{
            const stream=cloudinary.uploader.upload_stream(
                 {folder: "profilepic"},
                 (error, result)=>{
                    if(error) return reject (error);
                    resolve(result)
                 }
            )
            streamifier.createReadStream(file.buffer).pipe(stream)
        })
    }

    const newUser=new User({userName, email, password: hashedPassword, dob, profilepic: result.secure_url || ""})

    await newUser.save()

     res.status(201).json({ msg: "User created successfully" });
} catch (error) {
     console.error(err);
    res.status(500).json({ msg: "Server error" });
}
}


const login=async(req, res)=>{
    const {email, password}=req.body

    try {
        const user=await User.findOne({email})
        if(!user){return res.status(400).json({ msg: "User not found" });}

        const isMatch=await bcrypt.compare(password, user.password)
        if(!isMatch){return res.status(400).json({message:"incorrect password"})}

        const token=jwt.sign({id: user._id}, process.env.JWT_SECRET,{
            expiresIn: "7d"
        })

        res.json({token, user:{id: user._id, username: user.username, email: user.email, profilePic: user.profilePic}})
    } catch (error) {
           res.status(500).json({ msg: "Server error" });
    }
}

export {register, login}