const express = require('express')
const authMiddleware = require('../middileware/authMiddileware')
const productRoute = express.Router();
const userRole = require('../middileware/userRole')
const {allProducts,createProduct, updateProduct,deleteProduct,getProduct, createReview,getAllReviews} = require('../controllers/productController');

productRoute.route('/')
.get(authMiddleware.auth,allProducts)

productRoute.route('/createProduct')
.post(authMiddleware.auth,userRole('admin'),createProduct)

productRoute.route('/:_id')
.get(getProduct)
.put(authMiddleware.auth,userRole('admin'),updateProduct)
.delete(authMiddleware.auth,userRole('admin'),deleteProduct)

productRoute.route('/:_id/reviews').get(getAllReviews)

productRoute.route('/review/:id')
.post(authMiddleware.auth,createReview)
module.exports = productRoute;