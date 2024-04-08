import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const signInAPI = createAsyncThunk("signInAPI", async (formData, {rejectWithValue}) => {
    try
    {
        const res = await axios.post(`news-website-nine-virid.vercel.app/user/sign-in`, formData)

        return res.data

    } catch (error)
    {
        return rejectWithValue(error)
    }
})

const initialState = {
    formData: {},
    popup: false,
    isChecked: false,
    data: null,
    loading: false,
    error: null
}

const signInSlice = createSlice({
    name: "signIn",
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            state.formData = {...state.formData, ...action.payload}
            state.data = null
        },
        popupHandler: (state, action) => {
            state.popup = action.payload
        },
        setIsChecked: (state, action) => {
            state.isChecked = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signInAPI.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(signInAPI.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload

            if (state.data.error)
            {
                state.popup = true
            }
        })

        builder.addCase(signInAPI.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export const {updateFormData, popupHandler, setIsChecked} = signInSlice.actions
export default signInSlice.reducer
