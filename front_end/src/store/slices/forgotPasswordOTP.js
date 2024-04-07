import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const forgotOTP_API = createAsyncThunk('forgotOTP_API', async ({otp, email}, {rejectWithValue}) => {
    try
    {
        const res = await axios.post(`http://127.0.0.1:2000/user/forgot-password-otp`, {otp, email})

        return res.data
    } catch (error)
    {
        return rejectWithValue(error)
    }
})


const initialState = {
    otp: new Array(4).fill(""),
    time: 0,
    data: null,
    loading: false,
    error: null
}

const forgotPasswordOTP = createSlice({
    name: 'otp',
    initialState,
    reducers: {
        setOTP: (state, action) => {
            state.otp = action.payload
        },

        setTime: (state, action) => {
            state.time = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(forgotOTP_API.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(forgotOTP_API.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })

        builder.addCase(forgotOTP_API.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {setOTP, setTime} = forgotPasswordOTP.actions
export default forgotPasswordOTP.reducer