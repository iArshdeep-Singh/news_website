import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const userData = createAsyncThunk("userData", async (token, {rejectWithValue}) => {
    try
    {
        const res = await axios.get(`http://127.0.0.1:2000/user/${token}`)

        return res.data

    } catch (error)
    {
        return rejectWithValue(error)
    }
})

const initialState = {
    popupXX: false,
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

export const {setPopup} = profileDataSlice.actions
export default profileDataSlice.reducer