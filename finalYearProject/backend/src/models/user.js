const mongoose = require("mongoose")
const schema = mongoose.Schema

const newUser = new schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true
    }
})

const user = mongoose.model("allUsers" , newUser)
module.exports = user