const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/BookStore", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connected successfully");
  } catch (err) {
    console.log("connect failure: " + err);
  }
}

// async function connect() {
//     try {
//         await mongoose.connect('mongodb+srv://dvkhang:dovankhang123@bookstore.es6un.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//             useCreateIndex: true
//           });
//           console.log('Connected successfully');
//     }catch(err) {
//             console.log('connect failure: ' + err);
//     }
// }

// const mongoose = require('mongoose');
// function connect() {
//     const connection = "mongodb+srv://dvkhang:dovankhang123@.es6un.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//     mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
//         .then(() => console.log("Database Connected Successfully"))
//         .catch(err => console.log(err))
// }

module.exports = { connect };
