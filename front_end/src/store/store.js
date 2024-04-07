import {configureStore} from '@reduxjs/toolkit'
import newsSlice from './slices/newsSlice'
import newsContentSlice from './slices/newsContentSlice'
import signUpSlice from './slices/signUpSlice'
import signInSlice from './slices/signInSlice'
import imageUploadSlice from './slices/imageUploadSlice'
import profileDataSlice from './slices/profileDataSlice'
import editProfile from './slices/editProfile'
import deleteSlice from './slices/deleteSlice'
import emailSlice from './slices/emailSlice'
import otpSlice from './slices/otpSlice'
import forgotSlice from './slices/forgotPassword'
import forgotPasswordOTP from './slices/forgotPasswordOTP'
import updatePassword from './slices/updatePassword'

const store = configureStore({
    reducer: {
        news: newsSlice,
        content: newsContentSlice,
        signUp: signUpSlice,
        signIn: signInSlice,
        image: imageUploadSlice,
        user: profileDataSlice,
        edit: editProfile,
        delete: deleteSlice,
        email: emailSlice,
        otp: otpSlice,
        forgot: forgotSlice,
        forgotOTP: forgotPasswordOTP,
        updatePassword: updatePassword
    }
})

export default store