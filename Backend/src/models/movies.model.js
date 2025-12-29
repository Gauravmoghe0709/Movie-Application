const mongoose = require('mongoose');


const movieschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    relesedate:{
        type:Date,
        required:true,
    }
    ,
    poster: {
        type: String,
        required: false,
    }

});

const moviemodel = mongoose.model("MovieDatabase",movieschema)

module.exports = moviemodel;