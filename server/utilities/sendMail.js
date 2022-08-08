
const nodeMailer = require("nodemailer")

function transporter(){
  return nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD
    }
  })
}

function sendMail(mailOptions){

  // let {from, subject, html} = mailOptions

  mailOptions.to = process.env.APP_EMAIL

  return new Promise((s, e)=>{
    transporter().sendMail(mailOptions, function(error, info){
        if (error) {
          e(error)
        } else {
          s(info)
        }
      });
    })
}


module.exports = sendMail