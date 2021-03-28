const mongoose = require('mongoose');

const signUpTemplate=new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        unique: true,
        required: 'Email address is required',
        
    },
    phone: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    },
    zip: {
        type:String,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    comanyname: {
        type:String,
        required:function(){return this.type1==='supplier'}
    },
    branch: {
        type:String,
        required:function(){return this.type1==='supplier'}
    },
    badge: {
        type:String,
        required:function(){return this.type1==='supplier'}
    },
    status: {
        type:String,
        default:'inactive'
    },
    date: {
        type:Date,
        default:Date.now
    },
});

module.exports=mongoose.model('registrations',signUpTemplate)