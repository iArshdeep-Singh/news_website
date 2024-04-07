const mongoose = require('mongoose')

const otpSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },

        otp: String,

        otp_expiry: Date
    }
)


const OTP = mongoose.model('OTP', otpSchema)

module.exports = OTP