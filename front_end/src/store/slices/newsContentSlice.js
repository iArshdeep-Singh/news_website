import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const newsContent = createAsyncThunk("newsContnet", async (url, {rejectWithValue}) => {
    try
    {
        const res = await axios.post(`http://127.0.0.1:2000/news-content`, {url})

        return res.data

    } catch (error)
    {
        return rejectWithValue(error)
    }
})

const initialState = {
    data: null,
    loading: false,
    error: null
}

const newsContentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(newsContent.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(newsContent.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })

        builder.addCase(newsContent.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export const {reset} = newsContentSlice.actions
export default newsContentSlice.reducer