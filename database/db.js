const mongoose = require('mongoose')

exports.db= ()=>{

       mongoose.connect(process.env.DB_URL)
       .then(()=>{
        console.log("db connected");
       })
       .catch((err)=>{
        console.log(err);
        process.exit(1);
       })

}