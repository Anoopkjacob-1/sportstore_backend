const mongoose = require('mongoose');

const categoreyTemplate=new mongoose.Schema({
    categoreyname: {
        type:String,
        unique: true,
        required:true
    },
});

module.exports=mongoose.model('categorey',categoreyTemplate)