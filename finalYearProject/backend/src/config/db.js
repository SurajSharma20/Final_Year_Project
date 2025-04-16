const mongoose = require("mongoose");
require("dotenv").config()

const URI = process.env.DB_URL

const dbConnection = async() =>{
    try {
        await mongoose.connect(URI);
        console.log(`DB is connected..`)
    } catch (error) {
        console.log(error.message)
    }
}

dbConnection(); 