import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const userData = createAsyncThunk("userData", async (token, {rejectWithValue}) => {
    try
    {
        const res = await axios.get(`https://news-website-sable.vercel.app/user/${token}`)

        return res.data

    } catch (error)
    {
        return rejectWithValue(error)
    }
})

const initialState = {
    popupXX: false,
    popupXL: false,
    data: null,
    loading: false,
    error: null
}

const profileDataSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setPopup: (state, action) => {
            state.popupXX = action.payload
        },
        setPopXL: (state, action) => {
            state.popupXL = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userData.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(userData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })

        builder.addCase(userData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

    }
})

export const {setPopup, setPopXL} = profileDataSlice.actions
export default profileDataSlice.reducer
