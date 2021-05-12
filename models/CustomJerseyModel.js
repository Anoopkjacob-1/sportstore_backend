const mongoose = require('mongoose');


const JerseyTemplate=new mongoose.Schema({
    userid:{
        type:String,
         required:true
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
    Amount: {
        type:Number,
        default:0
    },
});

module.exports=mongoose.model('jersey_orders',JerseyTemplate)