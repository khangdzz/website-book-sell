const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bill = new Schema({
    email: String,
    name: String,
    address: String,
    phoneNumber: String,
    delivery: Boolean,
    received : Boolean,
    status: Boolean, 
    cart:{
        items:[{
            productId: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            imageBook: {type: String},
            nameBook: {type: String},
            priceBook: {
                type: Number,
                default: 0, 
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
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Bill',bill,'Bill');