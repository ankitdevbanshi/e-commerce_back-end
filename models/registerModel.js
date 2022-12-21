
const mongoose = require('mongoose')
const validator = require('validator')

const schema = new mongoose.Schema({
        email : {
            type : String,
            unique : true,
           validate :  [validator.isEmail,"invalid email"]
        },
         time : Date,
         OTP : Number 
})

const newRegistrations = mongoose.model('newRegistrations',schema)
module.exports = newRegistrations;

