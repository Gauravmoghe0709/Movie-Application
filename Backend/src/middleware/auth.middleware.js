const usermodel = require("../models/usermodel");
const jwt = require('jsonwebtoken');


async function authmiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Please login first"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_TOKEN)
        const user = await usermodel.findById(decoded.id)
        req.user = user;
        next();
    }catch(error){
        console.log(error)
    }
}

module.exports = authmiddleware;