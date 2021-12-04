const books = require('../model/book');
const users = require('../model/user');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const io = require('../../index');




class ProductController{
    
    //[GET] product/detailProduct
    show(req, res,next){
        books.findOne({_id : req.params.id})
        .then( book => {
            res.render('detailProduct',mongooseToObject(book));
            
        })
        .catch(next);
        
    }

    comment(req, res, next){
       console.log(req.body);
    }
}

module.exports =  new ProductController;

