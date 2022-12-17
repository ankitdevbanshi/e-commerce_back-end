const express = require('express')
const app = require('./app')

const DB = require('./database/db') 
app.listen(3000)
 DB.db()


