const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')
const fs = require('fs')
const User = require('../models/userModel')
const OTP = require('../models/otpModel')
require('colors')

dotenv.config()
const key = process.env.JWT_SECRET_KEY


const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


function generateOTP() {
    const otp = Math.floor(1000 + Math.random() * 9000)
    // generate a random 4-digit otp
    return otp.toString()
}


// signup
const signUp = async (req, res) => {
    try
    {
        const {name, username, password} = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // register user
        await new User({
            name,
            username,
            password: hashedPassword
        }).save()


        const user = await User.findOne({username: username}).select('-password')

        // payload
        const data = {
            id: user.id
        }

        const token = jwt.sign(data, key)


        console.log("User is registered successfully.".bgBlue.white)
        return res.status(201).send({
            success: true,
            message: "User is registered successfully.",
            token
        })

    } catch (error)
    {
        console.log(`-->${error}`.bgRed.white)
        return res.status(500).send({message: error.message})
    }
}


// login
const login = async (req, res) => {
    try
    {
        const {username, password} = req.body

        // check user
        const user = await User.findOne({username})

        // jst Token
        const data = {
            id: user.id
        }

        const token = jwt.sign(data, key)

        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!passwordCompare)
        {
            console.error("Incorrect password.".bgRed.white)
            return res.status(200).send({
                success: false,
                password: "Incorrect password."
            })
        } else if (passwordCompare)
        {
            console.log("Login successfully".bgBlue.white)
            return res.status(200).send({
                success: true,
                message: "Login successfully.",
                token
            })
        }

    } catch (error)
    {
        console.log(`-->${error}`.bgRed.white, error)
        return res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
}



// upload photo
const uploadPhoto = async (req, res) => {
    try
    {
        const token = req.params.id

        const {id} = jwt.verify(token, key)

        console.log(id, "---Params")


        const image = fs.readFileSync(req.file.path)

        await User.findByIdAndUpdate(id, {
            image: {
                name: req.file.filename,
                data: image,
                contentType: req.file.mimetype,
            }
        })

        const user = await User.findById(id).select('-password')

        // delete image file in folder
        fs.unlinkSync(req.file.path)

        console.log("Image is uploaded.".bgBlue.white)
        return res.status(200).send({
            success: true,
            message: "Uploaded.",
            user
        })

    } catch (error)
    {
        console.log(`-->${error}`.bgRed.white, error)
        return res.status(500).send({
            success: false,
            message: "Image isn't uploaded.",
            error
        })
    }
}



// send profile data
const userData = async (req, res) => {
    try
    {
        const token = req.params.id

        const {id} = jwt.verify(token, key)

        const {image, name, username, email, createdAt} = await User.findById(id).select('-password')

        // convert from Buffer to String
        const imageString = image?.data?.toString('base64')

        const user = {
            name,
            username,
            email,
            imageString,
            createdAt
        }

        if (user)
        {
            console.log("Profile data is sent.".bgBlue.white)
            return res.status(200).send({
                success: true,
                message: "Profile data.",
                user
            })
        }

    } catch (error)
    {
        console.log(`-->${error}`.bgRed.white, error)
        return res.status(500).send({
            success: false,
            message: "Image didn't upload.",
            error
        })
    }
}


// update user profile data
const update = async (req, res) => {
    try
    {
        const token = req.params.id
        const form = req.body.jsonData

        const data = JSON.parse(form)
        const {name, username} = data

        const {id} = jwt.verify(token, key)


        if (username.match(/.go/))
        {


            if (req.file)
            {
                const image = fs.readFileSync(req.file.path)
                await User.findByIdAndUpdate(id, {
                    name: name,
                    image: {
                        name: req.file.filename,
                        data: image,
                        contentType: req.file.mimetype,
                    }
                })

                fs.unlinkSync(req.file.path)
            } else
            {
                await User.findByIdAndUpdate(id, {
                    name: name
                })
            }
        } else
        {
            if (req.file)
            {
                const image = fs.readFileSync(req.file.path)
                await User.findByIdAndUpdate(id, {
                    name: name,
                    username: username,
                    image: {
                        name: req.file.filename,
                        data: image,
                        contentType: req.file.mimetype,
                    }
                })

                fs.unlinkSync(req.file.path)
            } else
            {
                await User.findByIdAndUpdate(id, {
                    name: name,
                    username: username
                })
            }
        }


        console.log("Profile updated successfully..".bgBlue.white)
        return res.status(200).send({
            success: true,
            message: "Profile updated.",
        })

    } catch (error)
    {
        console.log(`-->${error}`.bgRed.white, error)
        return res.status(500).send({
            success: false,
            message: "Profile didn't update.",
            error
        })
    }
}


// delete user profile
const deleteProfile = async (req, res) => {
    try
    {
        const token = req.params.id
        const {password} = req.body

        const {id} = jwt.verify(token, key)

        const user = await User.findById(id)
        const passwordCompare = await bcrypt.compare(password, user.password)

        if (passwordCompare)
        {
            await User.deleteOne({_id: id})

            console.log("Account Deleted Successfully.".bgBlue.white)
            return res.status(200).send({
                success: true,
                message: "Your account has been deleted."
            })
        }

        if (!passwordCompare)
        {
            console.log("Incorrect Password.".bgMagenta.white)
            return res.status(200).send({
                success: false,
                password: "Incorrect Password."
            })
        }


    } catch (error)
    {
        console.log(`-->${error}`.bgRed.white, error)
        return res.status(500).send({
            success: false,
            message: "Profile didn't delete.",
            error
        })
    }
}


// send email verification code 
const sendOTP = async (req, res) => {
    try
    {
        const {email} = req.body
        const token = req.params.id

        const {id} = jwt.verify(token, key)

        if (!email)
        {
            return res.status(200).send({
                success: false,
                message: "Email is required."
            })
        }

        const user = await User.findOne({email})

        if (user)
        {
            console.log("Already registered email.".bgRed.white)
            return res.status(200).send({
                success: false,
                message: "This email is already used."
            })
        }

        // insert email in User schema
        await User.findByIdAndUpdate(id, {
            email: email
        })


        const otp_expiry = new Date(Date.now() + 120000) // 2 minutes from now
        const otp = generateOTP()


        await OTP.updateOne({email}, {$set: {otp, otp_expiry}}, {upsert: true})


        transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "OTP Verification",
            html: `<h1>NEWS APP</h1><h3>Your OTP for verification is <b style="color:blue;">${otp}</b></h3>`
        }, async (error, info) => {
            if (error)
            {
                await User.deleteOne({email})

                console.log(`-->${error}`.bgRed.white, error)
                return res.status(200).json({
                    success: false,
                    message: "OTP isn't sent. Please check your email and try again.",
                })


            } else
            {
                console.log("-->Email sent:".bgBlue.white + `${info.response}`.blue)
                console.log(`OTP sent to ${email}`.bgMagenta.white)
                return res.status(200).json({
                    success: true,
                    message: `OTP sent to ${email}`,
                })
            }
        })


    } catch (error)
    {
        console.log(`-->${error}`.bgRed.white, error)
        return res.status(500).send({
            success: false,
            message: "OTP isn't sent.",
            error
        })
    }
}



// OTP verification
const verifyOTP = async (req, res) => {
    try
    {
        const otp_array = req.body.otp
        const token = req.params.id

        const otp_string = otp_array.join('') // convert an array into a string with no comma separator

        const {id} = jwt.verify(token, key)

        const {email} = await User.findById(id)
        const {otp, otp_expiry} = await OTP.findOne({email})

        if (otp_expiry < new Date())
        {
            return res.status(200).send({
                success: false,
                expired: true,
                message: "OTP has been expired."
            })
        } else if (otp !== otp_string)
        {
            return res.status(200).send({
                success: false,
                message: "Incorrect OTP."
            })
        } else
        {
            res.status(200).send({
                success: true,
                message: "OTP verified successfully."
            })
        }


    } catch (error)
    {
        console.log(`-->${error}`.bgRed.white, error)
        return res.status(500).send({
            success: false,
            message: "OTP isn't verified.",
            error
        })
    }
}


// forgot password
const forgotPassword = async (req, res) => {
    try
    {
        const {email} = req.body

        const user = await User.findOne({email: email})

        if (!user)
        {
            console.log("Email isn't registerd.".bgRed.white)
            return res.status(200).send({
                success: false,
                message: "Email isn't registerd."
            })
        }

        if (user)
        {
            const otp_expiry = new Date(Date.now() + 120000) // 2 minutes from now
            const otp = generateOTP()


            await OTP.updateOne({email}, {$set: {otp, otp_expiry}}, {upsert: true})

            transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "OTP Verification",
                html: `<h1>NEWS APP</h1><h3>Your OTP for verification is <b style="color:blue;">${otp}</b></h3>`
            }, (error, info) => {
                if (error)
                {
                    console.log(`-->${error}`.bgRed.white, error)
                    return res.status(200).json({
                        success: false,
                        message: "OTP isn't sent. Please check your email and try again.",
                    })

                } else
                {
                    console.log("-->Email sent:".bgBlue.white + `${info.response}`.blue)
                    console.log(`OTP sent to ${email}`.bgMagenta.white)
                    return res.status(200).json({
                        success: true,
                        message: `OTP sent to ${email}`,
                    })
                }
            })
        }

    } catch (error)
    {
        console.log(`-->${error}`.bgRed.white, error)
        return res.status(500).send({
            success: false,
            message: "OTP isn't sent.",
            error
        })
    }
}


// forgot password OTP verification
const forgotPasswordVerification = async (req, res) => {
    try
    {
        const otp_array = req.body.otp
        const mail = req.body.email

        const otp_string = otp_array.join('') // convert an array into a string with no comma separator

        const {otp, otp_expiry} = await OTP.findOne({email: mail})


        if (otp_expiry < new Date())
        {
            console.log("OTP has been expired".bgRed.white)
            return res.status(200).send({
                success: false,
                expired: true,
                message: "OTP has been expired."
            })
        } else if (otp !== otp_string)
        {
            console.log("Incorrect OTP".bgRed.white)
            return res.status(200).send({
                success: false,
                message: "Incorrect OTP."
            })
        } else
        {
            console.log("OTP verified successfully.".bgBlue.white)
            res.status(200).send({
                success: true,
                message: "OTP verified successfully."
            })
        }


    } catch (error)
    {
        console.log(`-->${error}`.bgRed.white, error)
        return res.status(500).send({
            success: false,
            message: "OTP isn't verified.",
            error
        })
    }
}


// update password
const updatePassword = async (req, res) => {
    try
    {
        const {password, email} = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.findOne({email})

        if (user)
        {

            await User.updateOne({email}, {password: hashedPassword})
                .then(() => {
                    console.log("Password updated successfully.".bgBlue.white)
                    res.status(200).send({
                        success: true,
                        message: "Password updated successfully."
                    })
                })
        }

        if (!user)
        {
            console.log(`Password isn't updated. Please try again.`.bgRed.white)
            res.status(200).send({
                success: false,
                message: "Password isn't updated. Please try again."
            })
        }

    } catch (error)
    {
        console.log(`-->${error}`.bgRed.white, error)
        return res.status(500).send({
            success: false,
            message: "Password isn't updated.",
            error
        })
    }
}


module.exports = {
    signUp,
    login,
    uploadPhoto,
    userData,
    update,
    deleteProfile,
    sendOTP,
    verifyOTP,
    forgotPassword,
    forgotPasswordVerification,
    updatePassword
}
