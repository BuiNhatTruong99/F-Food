const nodemailer = require("nodemailer");

const sendMail = async ({ email, html }) => {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_NAME, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"FFood" <no-reply@ffood.com>', // sender address
        to: email, // list of receivers
        subject: "Fogot Password", // Subject line
        html: html, // html body
    });

    return info;
}

module.exports = sendMail;