import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const emailAPI = createAsyncThunk('emailAPI', async ({token, email}, {rejectWithValue}) => {
    try
    {
        const res = await axios.post(`https://news-website-sable.vercel.app/${token}`, {email})

        return res.data

    } catch (error)
    {
        return rejectWithValue(error)
    }
})

const regexPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
const initialState = {
    email: null,
    validation: null,
    iNext: 0,
    data: null,
    loading: false,
    error: null
}

const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        setMail: (state, action) => {
            state.email = action.payload

            if (!regexPattern.test(state.email))
            {
                state.validation = "Enter valid email."
            } else
            {
                state.validation = null
            }

        },

        setNext: (state, action) => {
            state.iNext = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(emailAPI.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(emailAPI.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })

        builder.addCase(emailAPI.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {setMail, setNext} = emailSlice.actions
export default emailSlice.reducer
