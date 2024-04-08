import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import keys from './key'

export const newsData = createAsyncThunk("newsData", async ({key, query, endpoint, country, category, page}, {rejectWithValue}) => {

    let randomIndex = Math.floor(Math.random() * keys.length)
    console.log(key[randomIndex])
    try
    {

        if (endpoint && query)  
        {
            const res = await axios.get(`https://newsapi.org/v2/${endpoint}?q=${query}&sortBy=relevancy&apiKey=${key[randomIndex]}`)
            return res.data.articles
        }
        if (endpoint && country)
        {

            if (endpoint === 'top-headlines')
            {
                const res = await axios.get(`https://newsapi.org/v2/${endpoint}?country=${country}&pageSize=25&page=${page}&apiKey=${key[randomIndex]}`)
                return res.data.articles
            } else
            {
                const res = await axios.get(`https://newsapi.org/v2/${endpoint}?q=India&sortBy=relevancy&pageSize=25&page=${page}&apiKey=${key[randomIndex]}`)
                return res.data.articles
            }

        } else if (endpoint && category)
        {

            if (endpoint === 'top-headlines')
            {

                const res = await axios.get(`https://newsapi.org/v2/${endpoint}?category=${category}&language=en&pageSize=25&page=${page}&apiKey=${key[randomIndex]}`)

                return res.data.articles
            } else
            {
                let customQuery = null
                switch (category)
                {
                    case 'sports':
                        customQuery = `${category} -technology -business -science -entertainment`
                        break;
                    case 'science':
                        customQuery = `${category} -technology -business -sports -entertainment`
                        break
                    case 'business':
                        customQuery = `${category} +india`
                        break
                    case 'technology':
                        customQuery = `${category} -sports -business -science -entertainment`
                        break
                    case 'entertainment':
                        customQuery = `${category} +bollywood`
                        break
                    default:
                        customQuery = `${category}`
                        break;
                }

                const res = await axios.get(`https://newsapi.org/v2/${endpoint}?q=${customQuery}&sortBy=relevancy&pageSize=25&page=${page}&apiKey=${key[randomIndex]}`)
                return res.data.articles
            }
        } else if (endpoint)
        {

            const customQuery = 'all'
            const res = await axios.get(`https://newsapi.org/v2/${endpoint}?q=${customQuery}&language=en&pageSize=25&page=${page}&apiKey=${key[randomIndex]}`)
            return res.data.articles

        }
    } catch (error)
    {
        return rejectWithValue(error)
    }
})




const initialState = {
    activeLink: {
        key: keys,
        endpoint: 'everything',
        query: null,
        country: null,
        category: null,
        page: 1,
    },
    switchTo: "everything",
    color: "",
    searchTerms: '',
    sideBar: "close",
    data: null,
    loading: false,
    error: null
}


const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        switchLink: (state, action) => {
            state.activeLink = {...state.activeLink, ...action.payload}
            state.switchTo = "everything"
            state.activeLink.page = 1
        },

        switchAllHead: (state, action) => {
            state.switchTo = action.payload
            state.activeLink.endpoint = action.payload
            state.activeLink.page = 1
        },

        handleSearch: (state, action) => {
            state.searchTerms = action.payload
        },
        handleSideBar: (state, action) => {
            state.sideBar = action.payload
        },
        updatePageBack: (state, action) => {
            if (state.activeLink.page > 0)
                state.activeLink.page--
        },
        updatePageNext: (state, action) => {
            if (state.activeLink.page < 4)
                state.activeLink.page++
        }
    },

    extraReducers: (builder) => {
        builder.addCase(newsData.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(newsData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })

        builder.addCase(newsData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {switchLink, switchAllHead, handleSearch, handleSideBar, handleSideBarLinks, updatePageBack, updatePageNext} = newsSlice.actions
export default newsSlice.reducer