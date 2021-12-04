const Books = require('../model/book');
const users = require('../model/user');
const bills = require('../model/bill');
const CartNotLogin = require('../model/cart');

// const books = require('../model/index');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const multer  = require('multer');

let storage = multer.diskStorage({
    filename: function (req, file, cb) {
      console.log(file.originalname);
      cb(null, Date.now()  + "-" + file.originalname);
    },
    destination: function (req, file, cb) {
        cb(null, 'src/public/img');
    }
});  

let upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        // console.log(file);
        if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype== "image/jpg" || file.mimetype== "image/jpeg"){
            cb(null, true);
        }else{
            return cb(new Error('Only image are allowed!'));
        }
    }
}).single("image");


// let upload = multer({ 
//     storage: storage
// }).single("image");


class HomeController {

    //[GET] /Contact
    detailBill(req,res,next){
        bills.findOne({_id : req.params.id})
             .then(bill =>{
                res.render('detailBill',{bill: mongooseToObject(bill)})
             })
        
    }  
    async confirmOrder(req, res,next){
       let bill = await bills.findOne({_id : req.params.id});
       let book = await Books.find({});
       let listIdITemChoose = [];
       bill.cart.items.map(item =>{
           for(let i = 0; i < book.length; i++) {
                if(item.productId.toString() == book[i]._id.toString()) {

                    book[i].quantitySold += parseInt(item.qty);
                    book[i].quantity -= parseInt(item.qty);
                    
                    
                    Books.updateOne({_id : book[i].id},{
                        quantitySold : book[i].quantitySold,
                        quantity : book[i].quantity,
                    }).then()
                    
                }
           }
            
        } )
    
        bill.delivery =  true;
        // bill.status =  true;
        bills.updateOne({_id : req.params.id},bill)
            .then(bill =>{
                res.redirect('/');
        })
    } 
    
    

    managerItems(req, res, next){
       Books.find({})
            .then(books =>{
                res.render('managerItems',{
                  book: mutipleMongooseToObject(books),
                })
            })
    }

    distroy(req, res, next){
        Books.deleteOne({_id: req.params.id})
             .then(() =>{
                 res.redirect('back');
             })
    }
    update(req, res, next){
        Books.findOne({_id: req.params.id})
             .then(book => {
                 res.render('updateItems',mongooseToObject(book));
             })
    }
    async updateItem(req, res, next){
       
        
        let book = await Books.findOne({_id: req.params.id});
                      
        await upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              console.log("A Multer error occurred when uploading."); 
            } else if (err) {
              console.log("An unknown error occurred when uploading." + err);
            }else{
                book.name = req.body.name;
                book.priceCurrent = req.body.priceCurrent;
                book.quantity = req.body.quantity; 
                try{
                    if(req.file.filename){
                        book.image = req.file.filename;

                    }
                } catch(e){
                    console.log(e.message);
                }
             
                Books.updateOne({_id : req.params.id},book)
                     .then(() => {
                        res.redirect('/admin/managerItems');
                     })
                
            }
        })             
    }
    async AddItems(req, res, next) {
        res.render('addItems');
    }
    async add(req, res, next){
  
       await upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              console.log("A Multer error occurred when uploading."); 
            } else if (err) {
              console.log("An unknown error occurred when uploading." + err);
            }else{
                let book = new Books({
                    name : req.body.name,
                    description : req.body.description,
                    nameAuthor : req.body.nameAuthor,
                    publicLocation : req.body.publicLocation,
                    image : req.file.filename,
                    priceOld : req.body.priceOld,
                    priceCurrent : req.body.priceCurrent,
                    quantity : req.body.quantity,
                    slug: req.body.kindBook,
                });
                book.save() 
                    .then( () => {
                        res.redirect('/admin/managerItems');
                    })
            }
        })  
    }


    managerUser(req, res, next) {
        users.find({})
             .then(user => {
                 res.render('managerUser',{user : mutipleMongooseToObject(user)});
             })
    }
    async complete(req, res, next) {
       let bill = await bills.findOne({_id : req.params.id});
       
    
        bill.status =  true;
        // bill.status =  true;
        bills.updateOne({_id : req.params.id},bill)
            .then(bill =>{
                res.redirect('/');
        })
    }
}   
        
module.exports = new HomeController;
       

