const express = require ('express');
const cookieParser = require('cookie-parser');
const userrouter = require("./router/user.router")
const movierouter = require("./router/movie.router")
const path = require('path');
const cors = require('cors');




const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}))
// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use("/user",userrouter);
app.use("/movies",movierouter);




module.exports = app;