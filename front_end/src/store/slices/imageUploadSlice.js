import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const uploadImage = createAsyncThunk('uploadImage', async ({formData, token}, {rejectWithValue}) => {
    try
    {
        const res = await axios.patch(`news-website-nine-virid.vercel.app/user/upload-image/${token}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return res.data

    } catch (error)
    {
        return rejectWithValue(error)
    }
})

const initialState = {
    imageData: null,
    data: null,
    loading: false,
    error: null
}


const imageUploadSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        imageHandler: (state, action) => {
            state.imageData = action.payload
        },
        setNull: (state, action) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {

        builder.addCase(uploadImage.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(uploadImage.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })

        builder.addCase(uploadImage.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export const {imageHandler, setNull} = imageUploadSlice.actions
export default imageUploadSlice.reducer
