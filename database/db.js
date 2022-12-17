const mongoose = require('mongoose')

exports.db= ()=>{

       mongoose.connect("mongodb://0.0.0.0:27017/eCommerceDB")
       .then(()=>{
        console.log("db connected");
       })
       .catch((err)=>{
        console.log(err);
        process.exit(1);
       })

}