const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cart = new Schema({
    id: String,
    cartContainer:{
        items:[{
            productId: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            imageBook: {type: String},
            nameBook: {type: String},
            priceBook: {
                type: Number,
                default:0,
            },
            discriptionBook: {type: String},
            qty: {
                type: Number,
                required: true,
            }
        }],
        price: {
            type: Number,
            default:0,
        }
    }
})

module.exports = mongoose.model('SessionNotLogIn',cart,'SessionNotLogIn');


