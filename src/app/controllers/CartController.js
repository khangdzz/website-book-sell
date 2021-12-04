const books = require('../model/book');
const users = require('../model/user');
const CartNotLogin = require('../model/cart');
const Bill = require('../model/bill');

const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');


class cartController{
  
  //[Put] add to cart
  async getProduct(req, res,next){ 
    if(res.locals.checkState){ 
      let user = await users.findOne({email : req.session.email});
      let book = await books.findOne({_id : req.params.id});
      
      user.cart.price += book.priceCurrent;
      
      
      
      const isExisting = user.cart.items
      .findIndex(objInItems => new String(objInItems.productId).trim() === new String(req.params.id).trim());
      if (isExisting >= 0) {
        user.cart.items[isExisting].qty += 1;
      } else {
        user.cart.items.push({ productId: req.params.id, imageBook: book.image,
          nameBook: book.name, priceBook: book.priceCurrent, discriptionBook: book.description, qty: 1 });
        }
        
        users.updateOne({_id : user._id}, user)
        .then(() =>{
          res.redirect('back');
        })     
        
      }
      else{


       let Cart = await CartNotLogin.findOne({id : req.signedCookies.sessionId});
       let book = await books.findOne({_id : req.params.id});

       Cart.cartContainer.price += book.priceCurrent;

       const isExisting = Cart.cartContainer.items
            .findIndex(objInItems => new String(objInItems.productId).trim() === new String(req.params.id).trim());

      if (isExisting >= 0) {
        Cart.cartContainer.items[isExisting].qty += 1;
      } else {
        Cart.cartContainer.items.push({ productId: req.params.id, imageBook: book.image,
          nameBook: book.name, priceBook: book.priceCurrent, discriptionBook: book.description, qty: 1 });
        }
      CartNotLogin.updateOne({id : req.signedCookies.sessionId} , Cart)
                  .then( () => {
                    res.redirect('back');
                  })

      
      }
      
      
    }
  async buyImediately(req, res, next) {
    if(res.locals.checkState){ 
      let user = await users.findOne({email : req.session.email});
      let book = await books.findOne({_id : req.params.id});
      
      user.cart.price += book.priceCurrent;
 
      const isExisting = user.cart.items
      .findIndex(objInItems => new String(objInItems.productId).trim() === new String(req.params.id).trim());
      if (isExisting >= 0) {
        user.cart.items[isExisting].qty += 1;
      } else {
        user.cart.items.push({ productId: req.params.id, imageBook: book.image,
          nameBook: book.name, priceBook: book.priceCurrent, discriptionBook: book.description, qty: 1 });
        }
        
        users.updateOne({_id : user._id}, user)
        .then(() =>{
          res.redirect('/cart/detailCart');
        })     
        
      }
      else{


       let Cart = await CartNotLogin.findOne({id : req.signedCookies.sessionId});
       let book = await books.findOne({_id : req.params.id});

       Cart.cartContainer.price += book.priceCurrent;

       const isExisting = Cart.cartContainer.items
            .findIndex(objInItems => new String(objInItems.productId).trim() === new String(req.params.id).trim());

      if (isExisting >= 0) {
        Cart.cartContainer.items[isExisting].qty += 1;
      } else {
        Cart.cartContainer.items.push({ productId: req.params.id, imageBook: book.image,
          nameBook: book.name, priceBook: book.priceCurrent, discriptionBook: book.description, qty: 1 });
        }
      CartNotLogin.updateOne({id : req.signedCookies.sessionId} , Cart)
                  .then( () => {
                    res.redirect('/cart/detailCart');
                  })

      
      }
  }

    async DestroyItemCart(req, res, next) {
      if(req.session.isAuth){
        let user = await users.findOne({email : req.session.email});
  
        let cartUpdate = user.cart;
        const isExisting = cartUpdate.items.findIndex(p => p.productId == req.params.id);
        let priceDeleteProduct = 0;
        if (isExisting >= 0) {
          priceDeleteProduct =cartUpdate.items[isExisting].priceBook * cartUpdate.items[isExisting].qty;
          cartUpdate.items.splice(isExisting, 1);
        }
  
        cartUpdate.price = cartUpdate.price - priceDeleteProduct;
        
        user.cart = cartUpdate;
  
        users.updateOne({_id : user._id}, user)
               .then(() =>{
                 res.redirect('back');
               }) 
      }
      else{
        let Cart = await CartNotLogin.findOne({id : req.signedCookies.sessionId});

        let cartUpdate = Cart.cartContainer;
        const isExisting = cartUpdate.items.findIndex(p => p.productId == req.params.id);
        let priceDeleteProduct = 0;
        if (isExisting >= 0) {
          priceDeleteProduct =cartUpdate.items[isExisting].priceBook * cartUpdate.items[isExisting].qty;
          cartUpdate.items.splice(isExisting, 1);
        }
  
        cartUpdate.price = cartUpdate.price - priceDeleteProduct;
        
        Cart.cartContainer = cartUpdate;
  
        CartNotLogin.updateOne({id : req.signedCookies.sessionId}, Cart)
               .then(() =>{
                 res.redirect('back');
               }) 
      }

    }
    detailCart(req,res,next) {
      
      if(req.session.isAuth){
        users.findOne({email : req.session.email})
             .then(user =>{
               res.render('detailCart',{
                 user : mongooseToObject(user)
               })
              // res.json({user : mongooseToObject(user)})
             })
      }
      else{
        CartNotLogin.findOne({id : req.signedCookies.sessionId})
                    .then(cart =>{
                        res.render('detailCart',{
                          cart : mongooseToObject(cart)
                        })
                    })
      }
    }

    async deleteInListCart(req, res, next) {
    
      if(req.session.isAuth){
        let user =  await users.findOne({email : req.session.email});

        let productIdArr = req.body.productId;
        let cartUpdate = user.cart;
        let saveIndex = [];
        cartUpdate.items.map((item,index) => {
            let isChecked =  productIdArr.includes(item.productId.toString());
            if(isChecked){
              saveIndex.push(index);
            }
        })
        
        for(let i = 0; i < saveIndex.length; i++) {        
          cartUpdate.price -= await cartUpdate.items[saveIndex[i]].priceBook * cartUpdate.items[saveIndex[i]].qty;               
        }
         
        for(let i = saveIndex.length - 1 ; i >= 0 ; i--) {   
            
          cartUpdate.items.splice(saveIndex[i], 1);    
        }
        

        user.cart = cartUpdate;
        
        users.updateOne({_id : user._id}, user)
              .then(() =>{
                res.redirect('back');
              }) 
      
      }
      else{
        let Cart = await CartNotLogin.findOne({id : req.signedCookies.sessionId});

        // res.json(Cart.cartContainer.items);
        let productIdArr = req.body.productId;
        let cartUpdate = Cart.cartContainer;
        let saveIndex = [];
        cartUpdate.items.map((item,index) => {
          let isChecked =  productIdArr.includes(item.productId.toString());
          if(isChecked){
            saveIndex.push(index);
          }
        })
        for(let i = 0; i < saveIndex.length; i++) {        
          cartUpdate.price -= await cartUpdate.items[saveIndex[i]].priceBook * cartUpdate.items[saveIndex[i]].qty;               
        }
         
        for(let i = saveIndex.length - 1 ; i >= 0 ; i--) {   
            
          cartUpdate.items.splice(saveIndex[i], 1);    
        }

        Cart.cartContainer = cartUpdate;
        
        CartNotLogin.updateOne({id : req.signedCookies.sessionId} , Cart)
                    .then( () => {
                      res.redirect('back');
                    })

      }


    }

    async buyItemChoosed(req,res,next) {

      if(req.session.isAuth){
        let user =  await users.findOne({email : req.session.email});
        

        let productIdArr = req.body.productId;
        let cartUpdate = user.cart;
        let saveIndex = [];
        cartUpdate.items.map((item,index) => {
            let isChecked =  productIdArr.includes(item.productId.toString());
            if(isChecked){
              saveIndex.push(item);
            }
        })
        // res.json(saveIndex);
        res.render('buyItemChoosed',{items : mutipleMongooseToObject(saveIndex)});
      }
      else{
        let Cart = await CartNotLogin.findOne({id : req.signedCookies.sessionId});

        let productIdArr = req.body.productId;
        let cartUpdate = Cart.cartContainer;
        let saveIndex = [];
        cartUpdate.items.map((item,index) => {
          let isChecked =  productIdArr.includes(item.productId.toString());
          if(isChecked){
            saveIndex.push(item);
          }
        })
        // res.json(saveIndex);
        res.render('buyItemChoosed',{items : mutipleMongooseToObject(saveIndex)});

      }

     }
     async storeBill(req,res,next){
        if(req.session.isAuth){
          let user =  await users.findOne({email : req.session.email});
          let bill = await  new Bill({
            email: user.email,
            name :user.name,
            address : res.locals.address,
            phoneNumber : user.phoneNumber,
            delivery : false,
            received: true,
            status:0,

          });
          
          let productIdArr = req.body.productId;
          let cartUpdate = user.cart;
          let saveIndex = [];
          let saveItemIsChoosed = [];
          cartUpdate.items.map((item,index) => {
              let isChecked =  productIdArr.includes(item.productId.toString());
              if(isChecked){
                saveIndex.push(index);
                saveItemIsChoosed.push(item);
              }
          })
          
          // console.log(saveItemIsChoosed);
          // bill.cart.items = saveIndex;

          for(let i = 0; i < saveItemIsChoosed.length; i++) {

            bill.cart.price += await saveItemIsChoosed[i].priceBook * saveItemIsChoosed[i].qty+30;
          }

          for(let i = 0; i < saveIndex.length; i++) {        
            cartUpdate.price -= await cartUpdate.items[saveIndex[i]].priceBook * cartUpdate.items[saveIndex[i]].qty;               
          }
           
          for(let i = saveIndex.length - 1 ; i >= 0 ; i--) {   
              
            cartUpdate.items.splice(saveIndex[i], 1);    
          }
          
          bill.cart.items = saveItemIsChoosed;
          bill.save();

          user.cart = cartUpdate;

          users.updateOne({email : user.email}, user)
               .then(function() {
                 res.redirect('/');
               })


        }else{
          let bill = await  new Bill({
            name : req.body.name,
            address : req.body.address,
            phoneNumber : req.body.phoneNumber,
            received: true,
            status:0,

          });
          
          let Cart = await CartNotLogin.findOne({id : req.signedCookies.sessionId});
          let productIdArr = req.body.productId;
          let cartUpdate = Cart.cartContainer;
          let saveIndex = [];
          let saveIndexProductIdMatch = [];
          cartUpdate.items.map((item,index) => {
            let isChecked =  productIdArr.includes(item.productId.toString());
            if(isChecked){
              saveIndex.push(item);
              saveIndexProductIdMatch.push(index);
            }
          })
        
          bill.cart.items = saveIndex;

          for(let i = 0; i < saveIndex.length; i++) {

            bill.cart.price += saveIndex[i].priceBook * saveIndex[i].qty+30;
          }

          
          bill.save();
        

          for(let i = 0; i < saveIndexProductIdMatch.length; i++) {   
            
            cartUpdate.price -=  cartUpdate.items[saveIndexProductIdMatch[i]].priceBook * cartUpdate.items[saveIndexProductIdMatch[i]].qty;               
          }
          
          for(let i = saveIndexProductIdMatch.length - 1 ; i >= 0 ; i--) {    
            cartUpdate.items.splice(saveIndexProductIdMatch[i], 1);    
          }
        
          Cart.cartContainer = cartUpdate;
            
          CartNotLogin.updateOne({id : req.signedCookies.sessionId} , Cart)
                      .then(function(){
                          res.redirect('/');
                        })
          }
      
     }

     async distroyBill(req, res, next) {
        let bill = await Bill.findOne({_id: req.params.id});
                  
        bill.received = false;

        Bill.updateOne({_id: req.params.id},bill)
            .then(function(){
              res.redirect('/acount/invoice');
            })
        //  await Bill.updateMany({status: false})
        //             .then( () => {
        //               res.redirect('/');
        //             })
     }

  }
  module.exports =  new cartController;
  


