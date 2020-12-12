const nodemailer = require('nodemailer');

const sendEmail = async (req) => {
    console.log(req);
    const text = `Hi there. 
    You were added as a boarder in a house located in an elaborate delusion.
    The house's name is ${req.house}. To confirm your room in the house,
    finish registering at https://floating-garden-93064.herokuapp.com/confirm.`

    const html = `<body style="font-family:sans-serif; text-align:center">
                <h3 style="margin:3rem 0"> ✧ . ・・ﾟﾟ・Confirm your room in Cloud Cottage・ﾟﾟ・.・ﾟﾟ・｡ </h3>
                <p>
                    You were added as a boarder in a house located inside an elaborate delusion. 
                    You still need to register to join the house.
                    Click 
                    <a href="https://floating-garden-93064.herokuapp.com/confirm" target="_blank" 
                        style="color:black">
                        this link</a>
                    to finish registering.
                </p><br/> 
                <div style="display: inline-block; background-color:peachpuff;padding:2em; border-radius:10px">
                    Your house's name is <b>${req.house}</b> 
                </div><br/><br/>
                <p style="text-align:left;margin-left:5rem">See you at home,</p>
                <p style="text-align:left;margin-left:5rem">Your loving Cloud</p>
                </body>
                `
                ;

    //create transporter (send email service) 
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "cottagenotifications@gmail.com",
            pass: "Bellfamily5%"
        }    
    })
 
    //define email 
    const mailOptions = {
        from: 'Cloud Cottage <cottagenotifications@gmail.com',
        to: 'Cloud Cottage <cottagenotifications@gmail.com',
        bcc: req.users,
        subject: `You\'re a boarder in ${req.house}`,
        text,
        html
    }

   //actually send email --> returns a promise
   await transporter.sendMail(mailOptions); 

};

module.exports = sendEmail;

/*
     //create transporter (send email service) 
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "db8e2b3fa78bb8",
            pass: "83dd8fabe0afd8"
        }    
    })
 */