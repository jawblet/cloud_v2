const nodemailer = require('nodemailer');

const sendEmail = async options => {
    //create transporter (send email service) 
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "db8e2b3fa78bb8",
            pass: "83dd8fabe0afd8"
        }    
    })

    //define email 
    const mailOptions = {
        from: 'Cloud Cottage <cottagenotifications@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.text
    }

   //actually send email --> returns a promise
   await transporter.sendMail(mailOptions); 

};

module.exports = sendEmail;