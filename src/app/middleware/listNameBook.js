const books = require('../model/book');
const { mutipleMongooseToObject } = require('../../util/mongoose');
module.exports =  function (req, res, next) {
    let listName  = [];
    let listBook = []
    books.find({})
        .then(book =>  {
            listBook = mutipleMongooseToObject(book)

            for(let i = 0 ; i < listBook.length; i++){
                listName.push(listBook[i].name);
            }
            listName = listName.join(',');
            res.locals.names = listName;
            
        })
        .catch(err =>{})    
    next();

}