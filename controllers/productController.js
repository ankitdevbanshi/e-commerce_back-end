const productModel = require("../models/productModel")
const ErrorHandeller = require("../utils/errorHandeller")
const SearchFeature = require("../utils/searchFeature")


exports.allProducts = async (req,res)=>{
    const search = new SearchFeature(productModel.find(),req.query).search().filter().pagination()
    // console.log(search);
     const products = await search.query;
      res.status(200).json(products)
                
}


exports.createProduct = async(req,res,next)=>{
 
    const newProduct = await productModel.create(req.body);
    res.status(201).json({
        success : true,
        newProduct
    })
                
}


exports.updateProduct =   async(req,res,next)=>{
                  
        let  product = await productModel.findById(req.params._id)
        if(!product){
            return next(new ErrorHandeller("Not Found",404))
        }
     product = await productModel.findByIdAndUpdate(req.params._id,req.body,{ new:true, runValidators :true, useFindandModify : false})

    res.status(200).json(product)

}


exports.deleteProduct =  async(req,res,next)=>{
 
          const product = productModel.findById(req.params._id);
          if(!product)
         await product.remove()
          res.status(200).json({
            success : true
          })

}

exports.getProduct =  async(req,res,next)=>{
     
           const product = productModel.findById(req.params._id)

           res.status(200).json({success:true,product})
}
