const express = require('express')
const router = express.Router()
const {getAllUser,registerUser} = require('../routes/userRoutes')

router.route('/')
.get(getAllUsers)

router.route('/register')
.post(registerUser)


module.exports = router