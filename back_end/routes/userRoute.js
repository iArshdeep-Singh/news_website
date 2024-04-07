const express = require('express')
const {signUp, login, uploadPhoto, userData, update, sendOTP, deleteProfile, verifyOTP, forgotPassword, forgotPasswordVerification, updatePassword} = require('../controllers/userController')
const signUpAuthentication = require('../middlewares/signUpAuthentication')
const signInAuthentication = require('../middlewares/signInAuthentication')
const imageAuthentication = require('../middlewares/imageAuthentication')
const editProfileAuthentication = require('../middlewares/editProfileAuthentication')
const passwordAuth = require('../middlewares/forgotPassword')
const upload = require('../helpers/imageHandler')

const router = express.Router()

// register route
router.post('/sign-up', signUpAuthentication, signUp)

// login route
router.post('/sign-in', signInAuthentication, login)

// upload image
router.patch('/upload-image/:id', upload.single("image"), imageAuthentication, uploadPhoto)

// send user profile data
router.get('/:id', userData)

// send OTP
router.post('/send-otp/:id', sendOTP)

// verify OTP
router.post('/verify-otp/:id', verifyOTP)

// forgot password
router.post('/forgot-password', forgotPassword)

// forgot password otp
router.post('/forgot-password-otp', forgotPasswordVerification)

// update password
router.patch('/update-password', passwordAuth, updatePassword)

// update user profile data
router.patch('/:id', upload.single("image"), editProfileAuthentication, update)

// delete route
router.delete('/:id', deleteProfile)


module.exports = router