const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        image: {
            name: String,
            data: Buffer,
            contentType: String
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User