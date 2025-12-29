const mongoose = require('mongoose');

async function connecttodb(){
    try {
        await mongoose.connect(process.env.MOONGODB_URL)
        console.log("Connected to database successfully");
    } catch (error) {
        console.log(error)
    }
}

module.exports = connecttodb;


