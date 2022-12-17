const express = require('express')

const productRoute = express.Router();
const {allProducts,createProduct, updateProduct,deleteProduct,getProduct} = require('../controllers/productController');

productRoute.route('/')
.get(allProducts)

productRoute.route('/createProduct')
.post(createProduct)

productRoute.route('/:_id')
.get(getProduct)
.put(updateProduct)
.delete(deleteProduct)


module.exports = productRoute;