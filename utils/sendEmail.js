
const nodeMailer = require('nodemailer')
exports.sendEmail = async(options,res)=>{
        try{
            console.log("send email started");
             const transporter = nodeMailer.createTransport({
               host : 'smtp.gmail.com',
               port:465,
                service : Process.env.MAIL_SERVICE,
                 secure : false,
                auth : {
                    user : "ankitdevbanshi4@gmail.com",
                    pass : process.env.EMAIL_PASS
                }
             })

             const mailOptions = {
                from : process.env.FROM_EMAIL,
                to : options.toEmail,
                subject : options.subject,
                text : options.msg
             }
             await transporter.sendMail(mailOptions)
            if(res)
              return res.send('email pass')
              return true;
        }
        catch(err){
              console.log(err);
            if(res)
              return res.send('email fail')
  return false
        }    
        
}