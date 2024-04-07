const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
require('colors')

dotenv.config()


const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


const sendEmail = async (email, otp) => {

    transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "OTP Verification",
        html: `<h3 style="color: white; background-color: black;">Your OTP for verification is <b>${otp}</b></h3>`
    }, (error, info) => {
        if (error)
        {
            console.log(`-->${error}`.bgRed.white, error)
        } else
        {
            console.log("-->Email sent:".bgBlue.white + `${info.response}`.blue)
        }
    })
}


module.exports = sendEmail