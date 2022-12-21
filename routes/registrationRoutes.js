const express = require('express')
const {register,otpVarification,completeRegistration} = require('../controllers/registrationController')


const router   = express.Router()

router.route('/')
.post(register)


router.route('/otpVarification')
.post(otpVarification)

router.route('/completeRegistration')
.post(completeRegistration)

module.exports = router