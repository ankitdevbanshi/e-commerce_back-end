const express = require('express')
const authMiddleware = require('../middileware/authMiddileware')
const router = express.Router()
const userRole = require('../middileware/userRole')
const {getAllUsers,registerUser,loginUser,
    logoutUser,forgotPassword,resetPassword,userDetails
    , updatePassword, updateProfile, getUser,updateUserRole, deleteUser} = require('../controllers/userController')



router.route('/register')
.post(registerUser)

router.route('/login')
.post(loginUser)

router.route('/logout')
.get(logoutUser)

router.route('/forgotPassword')
.post(authMiddleware.auth,forgotPassword)


router.route('/reset/:token')
.put(authMiddleware.auth,resetPassword)


router.route('/me')
.get(authMiddleware.auth,userDetails)

router.route('/me/updatePassword')
.put(authMiddleware.auth,updatePassword)

router.route('/me/updateProfile')
.put(authMiddleware.auth,updateProfile)




//admin work
router.route('/admin/users')
.get(authMiddleware.auth,userRole('admin'),getAllUsers)

router.route('/admin/user/:id')
.get(authMiddleware.auth,userRole('admin'),getUser)
.put(authMiddleware.auth,userRole('admin'),updateUserRole)
.delete(authMiddleware.auth,userRole('admin'),deleteUser)



module.exports = router