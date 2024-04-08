import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const otpAPI = createAsyncThunk('otpAPI', async ({otp, token}, {rejectWithValue}) => {
    try
    {
        const res = await axios.post(`https://news-website-nine-virid.vercel.app/user/verify-otp/${token}`, {otp})

        return res.data
    } catch (error)
    {
        return rejectWithValue(error)
    }
})


const initialState = {
    otp: new Array(4).fill(""),
    data: null,
    loading: false,
    error: null
}

const otpSlice = createSlice({
    name: 'otp',
    initialState,
    reducers: {
        setOTP: (state, action) => {
            state.otp = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(otpAPI.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(otpAPI.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })

        builder.addCase(otpAPI.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {setOTP} = otpSlice.actions
export default otpSlice.reducer
