import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const deleteAPI = createAsyncThunk("deleteAPI", async ({token, password}, {rejectWithValue}) => {
    try
    {
        const res = await axios.delete(`http://127.0.0.1:2000/user/${token}`, {
            data: {password}
        })

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


const deleteSlice = createSlice({
    name: 'delete',
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
        builder.addCase(deleteAPI.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(deleteAPI.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload

            if (state.data.success)
            {
                state.popupX = true
            }
        })

        builder.addCase(deleteAPI.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export const {setIsChecked, setPassword, popupHandler} = deleteSlice.actions
export default deleteSlice.reducer
