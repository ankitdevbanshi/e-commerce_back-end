const mongoose  = require('mongoose')
const validator = require('validator')
const nodeMailer = require('nodemailer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const crypto = require('crypto')



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

userSchema.pre('save',async function(next){
    if(!this.isModified('password'))     
              next()
 this.password = await bcrypt.hash(this.password,10)
 
    })

userSchema.methods.getJWT = async function (res) {
        let serialized;
       const token =   await jwt.sign({ id: this._id }, process.env.JWT_AUTH_KEY, {expiresIn: '100h'})

        // console.log(`token=========>${token}`);
       
            if(!token){
                console.log(_err);
                return res.send("err")
            }
        
           serialized = await cookie.serialize('token', token, {
              httpOnly: true,
            //   secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 7*24*60*60*1000,
              path: '/',
            }
             )
            //  console.log(`serialized======>${serialized}`);
   
           return serialized
}

userSchema.methods.comparePassword = async function(pass){
              console.log(pass);
             return await bcrypt.compare(pass.toString(),this.password.toString())
}


userSchema.methods.forgotPass = async function (){
               const bytes  =  crypto.randomBytes(20).toString('hex')

               this.resetPasswordToken =  crypto.createHash('sha256').update(bytes).digest('hex')
               this.resetPasswordExpire = Date.now() + (15*60*1000)
             await this.save({validateBeforeSave : false})
               return bytes ;
                 
}


const userModel  = mongoose.model('users',userSchema)
module.exports = userModel;
