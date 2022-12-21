


exports.sendJwt = async(user,statusCode,res)=>
{
    try{
     const serialized = await user.getJWT(res)
    //   const options = {
    //     expiresIn : new Date(Date.now + (7*24*60*60*1000)),
    //     httpOnly : true
    //   }
      
    //   res.status(statusCode).setHeader('x-access-token',token).json({
    //     success : true
    //   })
    
    res.setHeader('Set-Cookie', serialized);
    res.status(200).json('ok')
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success : false
          })
    }

} 