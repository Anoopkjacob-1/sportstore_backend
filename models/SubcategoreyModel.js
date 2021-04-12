const mongoose = require('mongoose');

const subcategoreyTemplate=new mongoose.Schema({
    subcategoreyid:{
        type:String,
      required:true
    },
    subcategoreyname: {
        type:String,
        required:true
    },
    categoreyno: {
        type:String,
        required:true
    },
    brandno: {
        type:String,
        required:true
    },
});

module.exports=mongoose.model('subcategorey',subcategoreyTemplate)