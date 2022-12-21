const mongoose  = require('mongoose')

const productSchema = new mongoose.Schema({
          
          productImg : [{
                      productImgId : {
                        type : String,
                        required : [true,'product img id is required']
                      },
                      productImgUrl : {
                        type : String,
                        required : [true,'product img url is required']
                      }
          }],
           name : {
            type : String,
            required : [true,'product name is required'],
            trime : true
          },
          category : {
            type : String,
            required : [true,'product category is required']
          },
          description : {
            type : String,
            required : [true,'product description is required']
          },
          price :{
            type : Number,
            required : [true,'product price is required']
          },
          stock : {
            type : Number,
            
            default : 1
          },
          createdAt : {
            type : Date,
             default : Date.now()
          },

          ratings : {
            type : Number,
             default: 0
          },
          noOfReviews : {
            type : Number,
            default : 0
          },
          reviews :[ { 
                       userId : String,
                        userName : {
                         type: String
                        },
                        userRating : {
                            type: Number,
                           
                        },
                        comment : String
          } ]
   
})

const productModel = mongoose.model('products',productSchema);

module.exports = productModel;






