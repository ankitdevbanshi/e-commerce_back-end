const ErrorHandeller = require("../utils/errorHandeller")


module.exports = (err,req,res,next)=>{
 
    err.statusCode = err.statusCode || 500;
    err.msg = err.msg || "internal server error"

    res.status(err.statusCode).json({
        success : false,
        error : err.msg
    })
}

