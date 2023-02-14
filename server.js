const express = require('express')
const app = require('./app')

const DB = require('./database/db') 
app.listen(process.env.PORT)
 DB.db()

//  this is my change 

