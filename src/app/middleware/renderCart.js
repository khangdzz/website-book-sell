
const users = require('../model/user');
const CartNotLogin = require('../model/cart');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

module.exports =  function(req, res, next){
    
    // console.log('check');
    if(req.session.isAuth){
        users.findOne({email : req.session.email})
            .then(user =>{
              
                if(res.locals.user == 'undefined'){
                    res.locals.user = mongooseToObject(user);
                }
                else{
                    res.locals.user = mongooseToObject(user);

                }
              
            })
            .catch(err =>{})
    }
    else{
        CartNotLogin.findOne({id :req.signedCookies.sessionId})
            .then(cartNotLogin =>{
                res.locals.cartNotLogin = mongooseToObject(cartNotLogin)
                // console.log(res.locals.cartNotLogin);
            })
            .catch(err =>{})

    }
 
    setTimeout(function (){
        next();
    },100);
}


