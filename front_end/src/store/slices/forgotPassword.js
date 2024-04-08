import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const forgotAPI = createAsyncThunk('forgotAPI', async (email, {rejectWithValue}) => {
    try
    {
        const res = await axios.post(`http://127.0.0.1:2000/user/forgot-password`, {email})

        return res.data

    } catch (error)
    {
        return rejectWithValue(error)
    }
})

const initialState = {
    email: null,
    iNext: 0,
    data: null,
    loading: false,
    error: null
}

const forgotSlice = createSlice({
    name: 'forgot',
    initialState,
    reducers: {
        setMail: (state, action) => {
            state.email = action.payload
        },

        setNext: (state, action) => {
            state.iNext = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(forgotAPI.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(forgotAPI.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })

        builder.addCase(forgotAPI.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {setMail, setNext} = forgotSlice.actions
export default forgotSlice.reducer
