const express = require('express');
const usercontroller = require("../controller/user.controller")
const authmiddleware = require('../middleware/auth.middleware')
const router = express.Router();





router.post("/register",usercontroller.registerUser)
router.post("/login",usercontroller.loginUser)
router.get("/logout",usercontroller.logoutUser)
router.post("/logout",usercontroller.logoutUser)
router.get('/me', authmiddleware, usercontroller.getCurrentUser)




module.exports = router