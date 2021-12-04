const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: String,
    permission: String,
    address: {
        ngo: String,
        phuong: String,
        huyen : String,
        tinh : String,

    },
    phoneNumber: String,
    password: String,
    email: String,
    gender: String,
    birth: String,
    avartar: String,
    status: String,
    timeIn: Date,
    timeOut: Date,
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
    },
    inform: [{
        
        content: String,
        statusRead: false,
    }]
})

module.exports = mongoose.model('User',user,'User');