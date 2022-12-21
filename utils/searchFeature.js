const { json } = require("body-parser");

class SearchFeature {
    constructor(query,queryStr){
              
          this.query = query;
          this.queryStr = queryStr
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name : {$regex : this.queryStr.keyword, $options : 'i' }
        } : {}
      
      this.query = this.query.find({...keyword})
       return this;
    }

    filter(){
        const queryCopy = {...this.queryStr}
        
        const removeFields = ['keyword','page','limit']
        removeFields.forEach((key)=>{
             delete queryCopy[key]
        })
       let str = JSON.stringify(queryCopy)
        str = str.replace(/\b(gt|gte|lt|lte)\b/g, key=>`$${key}`)
        console.log(queryCopy);
       this.query =  this.query.find(JSON.parse(str))
        return this;
    }

    pagination(){
        const itemPerPage = 1
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = (currentPage-1)*itemPerPage;
 
        this.query = this.query.limit(itemPerPage).skip(skip)
        return this
    }
}

module.exports = SearchFeature