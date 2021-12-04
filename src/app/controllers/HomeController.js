const Books = require('../model/book');
const users = require('../model/user');
const bills = require('../model/bill');
const CartNotLogin = require('../model/cart');

// const books = require('../model/index');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');


class HomeController {

    //[GET] /Contact
    homeShowBook(req,res,next){
        let perPage = 10;
        let page = req.query.page    || 1;

        
        Books.find({})
             .skip((perPage * page) - perPage)
             .limit(perPage)
             .exec(function(err, books) {
                Books.count().exec(function(err, count) {                   
                    if (err) return next(err);
                    if(req.session.Authorization != 'admin'){
                        res.render('home', {
                            book: mutipleMongooseToObject(books),
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    }
                    else{
                        bills.find({received: true})
                             .then(bill => {
                                 res.render('admin', {
                                     bill: mutipleMongooseToObject(bill)
                                 })
                             })
                        
                    }
                })
            })
        
    } 
    async searchBook(req, res,next){
        let perPage = 10;
        let page = req.query.page    || 1;
        let Name;
        if(req.body.nameBook == '' || req.body.nameBook == null || req.body.nameBook == 'undified'){
            console.log(123);
            Name = req.session.nameBookLocal;
        } else{
            req.session.nameBookLocal = req.body.nameBook;
            Name = req.body.nameBook;
        }


          Books.find({name: Name})
             .skip((perPage * page) - perPage)
             .limit(perPage)
             .exec(function(err, books) {
                Books.count().exec(function(err, count) {
                    
                    if (err) return next(err);
                    if(req.session.Authorization != 'admin'){
                        res.render('home', {
                            book: mutipleMongooseToObject(books),
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    }
                    else{
                        bills.find({})
                             .then(bill => {
                                 res.render('admin', {
                                     bill: mutipleMongooseToObject(bill)
                                 })
                             })
                        
                    }
                })
            })
       
                  
        
        
    }   
    sortPopular(req, res, next){
        let perPage = 10;
        let page = req.query.page    || 1;

        Books.find({})
             .skip((perPage * page) - perPage)
             .limit(perPage)
             .sort([['quantitySold', 'descending']])
             .exec(function(err, books) {
                Books.count().exec(function(err, count) {
                    
                    if (err) return next(err);
                    if(req.session.Authorization != 'admin'){
                        res.render('home', {
                            book: mutipleMongooseToObject(books),
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    }
                    else{
                        bills.find({})
                             .then(bill => {
                                 res.render('admin', {
                                     bill: mutipleMongooseToObject(bill)
                                 })
                             })
                        
                    }
                })
            })
        // Books.find({}).sort
    }
    sortPriceDes(req, res, next){
        let perPage = 10;
        let page = req.query.page    || 1;

        Books.find({})
             .skip((perPage * page) - perPage)
             .limit(perPage)
             .sort([['priceCurrent', 'descending']])
             .exec(function(err, books) {
                Books.count().exec(function(err, count) {
                    
                    if (err) return next(err);
                    if(req.session.Authorization != 'admin'){
                        res.render('home', {
                            book: mutipleMongooseToObject(books),
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    }
                    else{
                        bills.find({})
                             .then(bill => {
                                 res.render('admin', {
                                     bill: mutipleMongooseToObject(bill)
                                 })
                             })
                        
                    }
                })
            })
    }
    sortPriceAsc(req, res, next){
        let perPage = 10;
        let page = req.query.page    || 1;

        Books.find({})
             .skip((perPage * page) - perPage)
             .limit(perPage)
             .sort([['priceCurrent', 'asc']])
             .exec(function(err, books) {
                Books.count().exec(function(err, count) {
                    
                    if (err) return next(err);
                    if(req.session.Authorization != 'admin'){
                        res.render('home', {
                            book: mutipleMongooseToObject(books),
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    }
                    else{
                        bills.find({})
                             .then(bill => {
                                 res.render('admin', {
                                     bill: mutipleMongooseToObject(bill)
                                 })
                             })
                        
                    }
                })
            })
    }
    maxSold(req, res, next){
        let perPage = 10;
        let page = req.query.page    || 1;

        Books.find({})
             .skip((perPage * page) - perPage)
             .limit(perPage)
             .sort([['priceCurrent', 'asc']])
             .exec(function(err, books) {
                Books.count().exec(function(err, count) {
                    
                    if (err) return next(err);
                    if(req.session.Authorization != 'admin'){
                        res.render('home', {
                            book: mutipleMongooseToObject(books),
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    }
                    else{
                        bills.find({})
                             .then(bill => {
                                 res.render('admin', {
                                     bill: mutipleMongooseToObject(bill)
                                 })
                             })
                        
                    }
                })
            })
    }

    searchToList(req,res, next) {
        let perPage = 10;
        let page = req.query.page    || 1;
        let Name;
        if(req.body.nameBook == '' || req.body.nameBook == null || req.body.nameBook == 'undified'){
            
            Name = req.session.nameBookLocal;
        } else{
            req.session.nameBookLocal = req.body.nameBook;
            Name = req.body.nameBook;
        }


          Books.find({slug: req.params.slug})
             .skip((perPage * page) - perPage)
             .limit(perPage)
             .exec(function(err, books) {
                Books.find({slug: req.params.slug}).count().exec(function(err, count) {
                    if (err) return next(err);
                    if(req.session.Authorization != 'admin'){
                        res.render('home', {
                            book: mutipleMongooseToObject(books),
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    }
                    else{
                        bills.find({})
                             .then(bill => {
                                 res.render('admin', {
                                     bill: mutipleMongooseToObject(bill)
                                 })
                             })
                        
                    }
                })
            }) 
    }
}   
        
module.exports = new HomeController;
       

