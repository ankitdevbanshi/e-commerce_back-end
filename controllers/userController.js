const userModel = require('../models/userModel');
const { sendJwt } = require('../utils/sendJWT');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto');
const SearchFeature = require('../utils/searchFeature');
const validator = require('validator');
const newRegistrations = require('../models/registerModel');

exports.registerUser = async (req,res,next)=>{

  try{
    const {name,email,password} = req.body;

    let newUser = await userModel.create({
      name,email,password,
      avatar : {
        avatarId : "dlsk",
        avatarUrl : "sdhks"
      },

    })
  

    const token = newUser.getJWT()
        res.status(200).json({
          success : true,
          token,
          newUser
        })
      }
      catch(err){
            
            res.status(400).json({
              success : false,
              error : err.message
            })
      }
}
 

exports.getAllUsers = async(req,res)=>{
        
  try{
      const X = new SearchFeature(userModel.find(),req.query).pagination().search()
      console.log(X);
      const users = await X.query
      res.status(200).json(users)
  }
  catch(err){
      console.log(err);
      res.status(400).json({
        success :false
      })
  }
    }


exports.loginUser = async (req,res)=>{
    //  try{
          const {email, password} = req.body;

          if(!email || !password){
             return res.status(400).json({
                success : false,
                msg : 'both fields are required'
            })
          }

          const user = await userModel.findOne({email}).select('password')
          console.log(user);
          if(!user){
            return res.send("user not found")
          }
          if(! await user.comparePassword(password)){
            return res.status(400).json({
                success : false,
                msg : "invalid email or password"
            })
          }
           sendJwt(user,200,res);

        }
    //     catch(err){
    //          res.status(400).json({
    //           success: false,
    //           error : err.message
    //          })
    //     }




     





exports.logoutUser = async function( req,res){
      try{
            //  res.cookie('auth',null,{
            //   expiresIn : Date.now(),
            //   httpOnly : true
            //  })
             res.setHeader('x-access-token',null)
             res.status(200).json({
              status : true
             })
            }
            catch(err){
              console.log(err);
              res.status(400).json({
                status : false
               })
            }
            }


 exports.forgotPassword = async(req,res)=>{
  let user;
try{         
        const email = req.body.email;
         user = await userModel.findOne({email : email})
        if(!user){
          return res.send('user not found')
        }
        const bytes = await user.forgotPass()
        
        const resetPassUrl = `${req.protocol}://${req.get("host")}/reset`

        const resetPassMsg = `reset password token is ${resetPassUrl}/${bytes}`
                
        await sendEmail.sendEmail({
          email,
          subject : "reset password",
          resetPassMsg
        },res)

              }
catch(err){
  console.log(err);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save()
  res.send("failed")
}
 } 
 
 
 exports.resetPassword = async (req,res)=>{
    
  try{
      console.log(req.user);
      console.log(req.params);
      const token = req.params.token
      const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')

     const  user = await userModel.findOne({resetPasswordToken,resetPasswordExpire : {$gt : Date.now()}})
     if(!user){
      return res.send("not user")
     }

     const {password , confirmPassword} = req.body;
     if(password != confirmPassword){
      return res.send ("pass not match")
     }
     user.password = password;
     user.resetPasswordExpire = undefined
     user.resetPasswordToken = undefined;
     await user.save({validateBeforeSave : false});
      res.send('password changed')
    }
  catch(err){
    console.log(err);
    res.send('failed')
  }           
 }

 exports.userDetails = async (req,res)=>{
               
  try{
            res.send(req.user)
  }
  catch(err){
    console.log(err);
    res.send("faild")
  }
          }



 exports.updatePassword = async (req,res)=>{
      try{      
        const user = await userModel.findOne({email : req.user.email}).select('password')
        console.log(user);
        const {oldPassword,newPassword} = req.body
         if(!await user.comparePassword(oldPassword)){
            res.send("old pass is inccorect")
         }

        user.password = newPassword ;
        await user.save({validateBeforeSave:false});
       await sendJwt(user,200,res)
        
      }
      catch(err){
        console.log(err);
        res.send('fail')
      }       
 }
 
 
 exports.updateProfile = async (req,res)=>{
 
    try{
           const data = {
                  name : req.body.name,
                  email : req.body.email
                }
        const user = await userModel.findOneAndUpdate({_id : req.user._id},data,{
              runValidators : true,
              new : true,
              useFindAndModify : false
             })
             res.send("ok")
      console.log(user); 
        }
      catch(err){
            console.log(err);
            res.send('fail')
            }     
 }



 exports.getUser = async(req,res)=>{
            
          try{
            const user = await userModel.findById({_id : req.params.id})
            if(!user){
               return res.send('fail')
            }
            res.send(user)
          }
          catch(err){
            console.log(err);
            res.send('fail')
            } 
              
 }

 exports.updateUserRole = async(req,res)=>{
           try{
              const user = await userModel.findOne({_id:req.params.id})
              if(!user){
                return res.send('user not found')
              }
              user.role = req.body.role;
              await user.save();
              res.send('updated')
            }
            catch(err){
              console.log(err);
              res.send('failed')
            }
 }


 exports.deleteUser = async(req,res)=>{
            try{
           const user =   await userModel.findByIdAndDelete({_id:req.params.id})
           if(user)  
             return res.send('deleted')
            
            res.send("user not found")
            }
            catch(err){
              console.log(err);
              res.send('failed')
            }
            
 }
