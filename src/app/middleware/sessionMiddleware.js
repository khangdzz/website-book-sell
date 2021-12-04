const shortid = require('shortid');

const Cart = require('../model/cart');

module.exports =  function(req, res, next){
    if(!req.signedCookies.sessionId)
    {
        let sessionId = shortid.generate();
        res.cookie('sessionId', sessionId,{
            signed: true,
           
        });
        
        let cart = new Cart({
            id: sessionId,
        }).save();
    }
    next();
}