import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-])[A-Za-z\d@$!%*?&+-]{8,}$/
const name_pattern = /^[a-zA-Z\s']{6,50}$/
const username_pattern = /^[a-zA-Z0-9_]{6,15}$/

export const signUpAPI = createAsyncThunk("signUpAPI", async (formData, {rejectWithValue}) => {
    try
    {
        const res = await axios.post(`https://news-website-sable.vercel.app/user/sign-up`, formData)

        return res.data

    } catch (error)
    {
        return rejectWithValue(error)
    }
})

const initialState = {
    formData: {},
    validation: {
        name: null,
        username: null,
        password: null
    },
    next: 0,
    isChecked: false,
    data: null,
    loading: false,
    error: null
}


const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            state.formData = {...state.formData, ...action.payload}

            state.data = null

            if (!name_pattern.test(state.formData?.name))
            {
                state.validation.name = "The name should be between 6 and 50 characters long."

            } else
            {
                state.validation.name = null
            }

            if (!username_pattern.test(state.formData?.username))
            {
                state.validation.username = "The username should be between 6 and 15 characters long."
            } else
            {
                state.validation.username = null
            }

            if (!password_pattern.test(state.formData?.password))
            {
                state.validation.password = "Must include: a-z, A-Z, 0-9, & a symbol."
            } else
            {
                state.validation.password = null
            }
        },
        nextKey: (state, action) => {
            state.next = action.payload
        },
        setIsChecked: (state, action) => {
            state.isChecked = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpAPI.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(signUpAPI.fulfilled, (state, action) => {
            state.loading = false
            state.data = {...state.data, ...action.payload}
            state.validation = {
                name: null,
                username: null,
                password: null
            }
        })

        builder.addCase(signUpAPI.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export const {updateFormData, nextKey, setIsChecked} = signUpSlice.actions
export default signUpSlice.reducer
