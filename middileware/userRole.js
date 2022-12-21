
module.exports =  function role (roleStr){
           
    return role[roleStr] || (role[roleStr] = function(req,res,next){
            
        console.log(req.user);
        if(req.user.role == roleStr){
           return  next()
        }
        
        res.send(`only ${roleStr} can access`)
    }
    )
        
              
}