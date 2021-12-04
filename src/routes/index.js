const home = require('./home');
const product = require('./product');
const acount = require('./acount');
const cart = require('./cart');
const admin = require('./admin');


function route(app){

  
    app.use('/cart',cart);
    app.use('/admin',admin);
    app.use('/book',product);
    app.use('/acount',acount);
    app.use('/',home);
   
    
}

module.exports = route;