const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
require('colors')
const userRoute = require('./routes/userRoute')
const newsRoute = require('./routes/newsRoute')

const app = express()

// config env
dotenv.config()
const host = process.env.HOST
const port = process.env.PORT
const url = process.env.URL
const urlx = process.env.URLX

// middlewares
app.use(express.json())
app.use(cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}))
app.use(morgan('dev'))



// routes
app.use('/user', userRoute)
app.use('/news-content', newsRoute)
app.use(express.urlencoded({extended: false}))

app.use('/', (req, res) => {
    res.send("<h1>Hello, Universe!</h1>")
})



// connection
mongoose
    .connect(urlx)
    .then(() => {
        console.log(`|---APP CONNECTED TO DATABASE---|`.bgGreen.black)

        app.listen(port, () => {
            console.log(`App is listening to http://${host}:${port}`.bgWhite.black)
        })
    })
    .catch((errro) => {
        console.log(`--> ${errro}`.bgRed.white)
    })