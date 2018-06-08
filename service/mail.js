const nodemailer = require('nodemailer')
const config = require('../config/config')
console.log(config)
const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: config.email.auth
});

exports.sendMail = async (mailOptions) => {
    /*
    mailOptions = {
        from: ,
        to: ,
        subject: ,
        html:
    }
     */
    transporter.sendMail(mailOptions).then(function(info){
        console.log('then', info);
    }).catch(function(err){
        console.log('catch', err);
    });
}
