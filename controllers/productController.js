const productModel = require("../models/productModel")
const ErrorHandeller = require("../utils/errorHandeller")
const SearchFeature = require("../utils/searchFeature")

exports.allProducts = async ( req,res)=>{
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
     
           const product = await productModel.findById(req.params._id)

           res.status(200).json({success:true,product})
}


exports.createReview = async(req,res)=>{
         
    try{
             const product = await productModel.findById({_id:req.params.id})
             if(!product){
                 return res.send('product not found')
             }
             const obj = {
                  userName : req.user.name,
                  userId : req.user._id,
                  userRating : req.body.userRating,
                  comment : req.body.comment 
             }
             var isReviewed 
              product.reviews.find((rv)=>{
                if(rv.userId==obj.userId){
                    console.log("reviewed");
                    isReviewed = true;
                     rv.comment = obj.comment
                      product.ratings-=rv.userRating;
                     rv.userRating = obj.userRating;
                      product.ratings+= rv.userRating
                }
                
            })
            console.log(isReviewed);

              if(!isReviewed){
                console.log("first review");
                  console.log(product.reviews.length);
                  console.log(product.ratings);

                     var x = product.ratings * product.reviews.length
                     product.reviews.push(obj)
                     product.noOfReviews = product.reviews.length
                      product.ratings = ((x+obj.userRating)/product.reviews.length)
              }
              
             await product.save()
             res.send("reviewed ok")
            }
            catch(err){
                console.log(err);
                res.send('failed')
            }
}


exports.getAllReviews = async(req,res)=>{

     const product = await productModel.findById({_id : req.params._id})             
     console.log((req.params._id));
     if(!product){
        return res.send('product not found')
     }
     let search = new SearchFeature(product.reviews.filter,req.query).pagination().search()
     RVS = await search.query();
      res.send(RVS)
        
}