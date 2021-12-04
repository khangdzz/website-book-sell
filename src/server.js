const app = require('./index');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const users = require('./app/model/user');
const books = require('./app/model/book');
const cart = require('./app/model/cart');



io.on('connection', (socket) => {

    // console.log('a user connected');
  
    socket.on('comment', async (msg) => {
       let user = await users.findOne({email: msg.email.toString()});
       let book = await books.findOne({_id: msg.idItem.toString()});
       
       let now = new Date();
       book.comment.push({name : user.name, time: now.toDateString(), content : msg.content.toString(), avatar : user.avartar});
       books.updateOne({_id: msg.idItem.toString()}, book)
            .then(() => {
  
            })
            .catch(err => {
                console.log(err);
            })
       
       io.emit('comment', msg.content);
    });
    //add item to cart
    socket.on('changeQtyInCart', async (val)=> {
       let user = await users.findOne({_id: val.containCart.toString()});
       let newCart = await cart.findOne({_id: val.containCart.toString()});
       if(user){
           let newUser = user.cart.items;
           newUser.map((item)=> {
                if(item._id == val.idItemChange.toString()){
                    item.qty++;
                    val.qtyChange++;
                    user.cart.price += item.priceBook;
                }
           })
           user.cart.items = newUser;
           users.updateOne({_id: val.containCart.toString()}, user)
                .then()
           io.emit('changeQtyInCart',val.qtyChange);
       }
       else if(newCart){
            let arrItem = newCart.cartContainer.items;
           
            arrItem.map((item, index) => {
                if(item._id == val.idItemChange.toString()){
                   item.qty++;
                   val.qtyChange++;
                   newCart.cartContainer.price += item.priceBook;
                   
                //    console.log(item.qty);
                //    console.log(val.qtyChange);
                }
            })
            newCart.cartContainer.items = arrItem;
            cart.updateOne({_id: val.containCart.toString()}, newCart)
                .then()
            io.emit('changeQtyInCart',val.qtyChange);
           
       }
    })
  

    // lose item from cart
    socket.on('changeQtyInCartReduce', async (val)=> {
        let user = await users.findOne({_id: val.containCart.toString()});
        let newCart = await cart.findOne({_id: val.containCart.toString()});
        if(user){
            let newUser = user.cart.items;
            newUser.map((item)=> {
                    if(item._id == val.idItemChange.toString()){
                        item.qty--;
                        val.qtyChange--;
                        user.cart.price -= item.priceBook;
                    }
            })
            user.cart.items = newUser;
            users.updateOne({_id: val.containCart.toString()}, user)
                    .then()
            io.emit('changeQtyInCartReduce',val.qtyChange);
        }
        else if(newCart){
             let arrItem = newCart.cartContainer.items;
             console.log(arrItem);
             arrItem.map((item, index) => {
                 if(item._id == val.idItemChange.toString()){
                    item.qty--;
                    val.qtyChange--;
                    newCart.cartContainer.price -= item.priceBook;
                    // console.log('hello khang');
                    
                 //    console.log(item.qty);
                 //    console.log(val.qtyChange);
                 }
             })

             newCart.cartContainer.items = arrItem;
             cart.updateOne({_id: val.containCart.toString()}, newCart)
                 .then()
             io.emit('changeQtyInCartReduce',val.qtyChange);
            
        }
     })
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  