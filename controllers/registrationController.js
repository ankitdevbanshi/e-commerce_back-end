const validator = require('validator')
const newRegistrations = require("../models/registerModel")
const jwt = require("jsonwebtoken")
const userModel = require('../models/userModel')
const {sendEmail} = require('../utils/sendEmail')
const cookie = require('cookie')
const { sendJwt } = require('../utils/sendJWT')

exports.register = async(req,res)=>{
        
    try{
    if(!validator.isEmail(req.body.email.toString())){
          return res.send('invalid email')
         }

         const exUser = await userModel.findOne({email : req.body.email})
         if(exUser){
          return res.send('user already exists')
         }
        
            const exRegi = await newRegistrations.findOne({email : req.body.email})
            if(!exRegi){
              const otp = Math.floor(1000 + (9999 - 1000) * Math.random());
               const regi = {
                email : req.body.email,
                OTP : otp,
                time : Date.now() + (15*60*1000)
               }

              const created = await newRegistrations.create(regi);
              if(created){
                const sent =  await  sendEmail({
                      toEmail : created.email,
                      subject : 'OTP VARIFICATION',
                      msg : `here is your OTP ${created.OTP} valid for next 15 minutes`,

                  })
                    if(sent){
                        req.email = req.body.email; 
                        res.send('sent')
                    }
                    else{
                         res.send('som wen wrong')
                    } 
              } 
              else{
                console.log(created);
                res.send('try again')
              }
            }
            else{

            }
        }
        catch(err){
          console.log(err);
          res.send('fail')
        }
  }


  exports.otpVarification = async function(req,res){
           const otp = req.body.otp;
           const email = req.body.email
           console.log(email);
           const regi = await newRegistrations.findOne({email, OTP:otp});
          
           if(!regi){
            return res.send('try again')
           }
           const token  =  jwt.sign({email : email},"hefowhekhkjsnckjdkjcnskdlwueolijc",{
            expiresIn : Date.now()+(15*60*1000)
           })
          
           serialized = await cookie.serialize('registerToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000,
            path: '/',
                                            }
           )

           res.setHeader('Set-Cookie', serialized);
           res.send('ok')
  } 

  exports.completeRegistration = async(req,res)=>{
               
    try{
       const token =  req.cookies['registerToken']
        const decoded =  jwt.verify(token,"hefowhekhkjsnckjdkjcnskdlwueolijc")
        if(!decoded){
            return res.send('not auth')
        }
        console.log(`decoded====> ${decoded.email}`);

        const {name,password} = req.body;
        email = decoded.email
       
        let newUser = await userModel.create({
          name,email,password,
          avatar : {
            avatarId : "dlsk",
            avatarUrl : "sdhks"
          },
    
        })
           req.cookies['registerToken'] = null;
         sendJwt(newUser,200,res);
       
          }
          catch(err){
                
                res.status(400).json({
                  success : false,
                  error : err.message
                })
          }
  }