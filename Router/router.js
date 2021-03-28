
const express = require('express');
const router = express.Router();
const signUpTemplatecopy =require('../models/SignUpModels');
const bcrypt=require('bcrypt')


router.post('/signup',async (req,resp)=>{

    const salt=await bcrypt.genSalt(10)
    const securepassword=await bcrypt.hash(req.body.password,salt)
    const signUpUser= new signUpTemplatecopy({
        "name":req.body.name,
        "email":req.body.email,
        "phone":req.body.phone,
        "password":securepassword,
        "address": req.body.address,
        "city":req.body.city,
        "zip":req.body.zip,
        "type":req.body.usetype
        
    })

    console.log(req.body);
    signUpUser.save()
    .then(data=>{
       
        resp.status(200).json(data)
    })
    .catch(error=>{
        resp.status(400).json({error,message:' error '})
    })
});


router.post('/signin',async (req,resp)=>{

    console.log(req.body.email);
    console.log(req.body.password);

    signUpTemplatecopy.findOne({email:req.body.email})
    .then(signUpTemplatecopy=>{
        if(signUpTemplatecopy){
            bcrypt.compare(req.body.password,signUpTemplatecopy.password,(err,result)=>{
                if(err)
                {
                    resp.status(400).json({error:err,message:'password needed'})
                }
                if(result){
                    resp.status(200).json({
                        message:'valid user'
                    }) 
                    console.log("sucess login");

                }
                if(!result){
                    resp.status(400).json({
                        message:'invalid user'
                    }) 
                }
            })
        }else{
            resp.status(400).json({
                message:'invalid user'})
        }
    })
    .catch(error=>{
        resp.status(400).json({error:err,message:'email and password needed'})
    })

});

module.exports =router