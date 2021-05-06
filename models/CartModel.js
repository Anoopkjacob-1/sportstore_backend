
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartTemplate=new mongoose.Schema({
    productid:{
        type: Schema.Types.ObjectId,
        ref: "product"
       },
  customerid: {
           type: Schema.Types.ObjectId,
           ref: "registrations"
       },
     quantity: {
        type:Number,
        required:true
    },
    totalprice: {
        type:Number,
        required:true
    }, 
    status: {
        type:String,
        default:"cart"
    },
    date: {
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('cart',cartTemplate)