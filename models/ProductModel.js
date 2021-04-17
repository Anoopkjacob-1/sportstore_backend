const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productTemplate=new mongoose.Schema({
    productid:{
        type:String,
         required:true
       },
    categoreyno: {
        type: Schema.Types.ObjectId,
        ref: "categorey"
    },
    brandno: {
        type: Schema.Types.ObjectId,
        ref: "brand"
    },
    subcatno: {
        type: Schema.Types.ObjectId,
        ref: "subcategorey"
    },
    productname: {
        type:String,
        required:true
    },
    size: {
        type:Number,
        required:true
    },
    quantity: {
        type:Number,
        required:true
    },
    units: {
        type:String,
        required:true
    },
    color: {
        type:String,
        required:true
    },
    unitprice: {
        type:String,
        required:true
    }, 
    expdate: {
        type: Date,
        required:true
    },
    description: {
        type:String,
        required:true
    }
});

module.exports=mongoose.model('product',productTemplate)

