const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.auth = async function(req,res,next){
          try{
             console.log("cookie======> "+ req.cookies['token']);
     

                if(!req.cookies['token']){
                   return res.status(400).json({
                        success : false,
                        error : 'not authorized'
                    })
                }
              
            const decoded =   jwt.verify(req.cookies['token'],"hfkjdhfiuwegfshcjkbsckjbaskjdhcoqiwhodihcbjksbc")
          if(!decoded){
            return res.send("invalid tokennn")
          }
            const user = await userModel.findById(decoded.id)
            req.user = user;
            next();
          }
          catch(err){
               console.log(err);
               res.status(500).json({
                success : false,
                error : err.message
               })
          }
}

