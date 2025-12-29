const usermodel = require("../models/usermodel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



async function registerUser(req,res){

    const {name,email,password,role} = req.body

    try{
        const existuser = await usermodel.findOne({email})
        if(existuser){
            return res.status(404).json({
                message:"User already exists"
            })
        }

        const hashpassword = await bcrypt.hash(password,10)
        const user = await usermodel.create({
            name,
            email,
            password:hashpassword,
            role
        })

        const token = jwt.sign({id:user._id},process.env.JWT_TOKEN)
        res.cookie("token",token)
        res.status(201).json({
            message:"New user created successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })     

    }catch(error){
        console.log(error)
    }

}
async function loginUser(req,res){
    const{email,password} = req.body

    try{

        const user = await usermodel.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        const correctpassword = await bcrypt.compare(password,user.password)
        
        if(!correctpassword){
            return res.status(404).json({
                message: "Incorrect password"
            })
        }

        const token = jwt.sign({id:user._id},process.env.JWT_TOKEN)
        res.cookie("token",token)
        res.status(200).json({
            message:"Login successful",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    }
    catch(error){
        console.log(error)
    }
}
async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"Logout successful"
    })
}

async function getCurrentUser(req, res){
    try{
        const user = req.user;
        if(!user) return res.status(401).json({ message: 'Not authenticated' })
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
}







module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser

}