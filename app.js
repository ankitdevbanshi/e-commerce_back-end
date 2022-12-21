const express = require('express')
const app = express()
 require('dotenv').config({path : './config/config.env'})
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
const productRoute = require('./routes/productRoutes')
const errorMiddileware = require('./middileware/err')
const userRoutes = require('./routes/userRoutes')
const registrationRoutes = require('./routes/registrationRoutes')

app.use('/registration',registrationRoutes)
app.use('/products',productRoute)
app.use('/users',userRoutes)
// app.use(errorMiddileware)
 

module.exports = app   