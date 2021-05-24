const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JerseyTemplate=new mongoose.Schema({
    userid:{
        type: Schema.Types.ObjectId,
        ref: "registrations"
       },
    date: {
        type:Number,
        default:Date.now
    },
    default: {
        type:String,
       default:"not selected"
    },
    primarycolor: {
        type:String,
        required:true
    },
    Secondarycolor: {
        type:String,
        required:true
    },
    imageurl: {
        type:String,
        default:"no url"
    },
    sizeandnoof: [  
        {
        type:String,
        required:true
        }
    ],
    discrption: {
        type:String,
        default:1
    },
    status: {
        type:String,
        default:"pending"
    },
    payement: {
        type:String,
        default:"not paid"
    },
    Amount: {
        type:Number,
        default:0
    },
});

module.exports=mongoose.model('jersey_orders',JerseyTemplate)