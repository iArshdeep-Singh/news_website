import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const updatePasswordAPI = createAsyncThunk("updatePasswordAPI", async ({email, password}, {rejectWithValue}) => {
    try
    {
        const res = await axios.patch(`https://news-website-sable.vercel.app/user/update-password`, {password, email})

        return res.data

    } catch (error)
    {
        return rejectWithValue(error)
    }
})


const initialState = {
    password: null,
    isChecked: false,
    popupX: false,
    data: null,
    loading: false,
    error: null
}


const updatePassword = createSlice({
    name: 'updatePassword',
    initialState,
    reducers: {
        setPassword: (state, action) => {
            state.password = action.payload
            state.data = null
        },
        popupHandler: (state, action) => {
            state.popupX = action.payload
        },
        setIsChecked: (state, action) => {
            state.isChecked = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updatePasswordAPI.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(updatePasswordAPI.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload

            if (state.data.success)
            {
                state.popupX = true
            }
        })

        builder.addCase(updatePasswordAPI.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export const {setIsChecked, setPassword, popupHandler} = updatePassword.actions
export default updatePassword.reducer
