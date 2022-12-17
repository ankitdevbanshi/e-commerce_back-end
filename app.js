const express = require('express')
const app = express()
app.use(express.json())
const productRoute = require('./routes/productRoutes')
const errorMiddileware = require('./middileware/err')

app.use('/products',productRoute)
app.use(errorMiddileware)


module.exports = app