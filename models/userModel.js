const mongoose  = require('mongoose')
const validator = require('validator')
const nodeMailer = require('nodemailer')

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required : [true,"name is required"]
    },
    email : {
         type : String,
         unique : true,
         required : [true,'email is required'],
         validate : [validator.isEmail,'invalid email']
    },
    password : {
        type:String,
        required : [true,"password is required"],
        minLength : 8,
        select : false
    },
    avatar : {
           avatarId :{
            type:String,
            required : [true,"name is required"]
           },
           avatarUrl : {
            type:String,
            required : [true,"name is required"]
           }  
    },
    role : {
        type : String,
        default : 'user',
        required : [true,'role is required']
    },
    resetPasswordToken: String,
    resetPasswordExpire : Date
})

const userModel  = mongoose.model('users',userSchema)
module.exports = userModel;
