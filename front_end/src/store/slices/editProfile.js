import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const updateProfile = createAsyncThunk('updateProfile', async ({token, form}, {rejectWithValue}) => {
    try
    {
        const res = await axios.patch(`https://news-website-nine-virid.vercel.app/user/${token}`, form, {
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
    image: null,
    formData: null,
    data: null,
    loading: false,
    error: null
}


const editProfileSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = {...state.formData, ...action.payload}
            state.data = null
        },
        setImage: (state, action) => {
            state.image = action.payload
            state.data = null
        },
        setNull: (state, action) => {
            state.data = null
            state.formData = null
            state.image = null
        }
    },
    extraReducers: (builder) => {

        builder.addCase(updateProfile.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = true
            state.data = action.payload
        })

        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = true
            state.data = action.payload
        })
    }
})


export const {setFormData, setImage, setNull} = editProfileSlice.actions
export default editProfileSlice.reducer
