const express = require("express");
const router = express.Router();
const signUpTemplatecopy = require("../models/SignUpModels");
const bcrypt = require("bcrypt");

// to register the user

router.post("/signup", async (req, resp) => {
  if (req.body.usetype != "supplier") {
    req.body.companyname = "";
    req.body.branch = "";
    req.body.badgge = "";
  }
  const salt = await bcrypt.genSalt(10);
  const securepassword = await bcrypt.hash(req.body.password, salt);
  const signUpUser = new signUpTemplatecopy({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: securepassword,
    address: req.body.address,
    city: req.body.city,
    zip: req.body.zip,
    usetype: req.body.usetype,
    companyname: req.body.companyname,
    branch: req.body.branch,
    badge: req.body.badgge,
  });

  console.log(req.body);
  signUpUser
    .save()
    .then((data) => {
      resp.status(200).json({ message: "user registered"});
    })
    .catch((error) => {
      resp.status(400).json({ error: error, message: " error " });
    });
});

// to login 

router.post("/signin", async (req, resp) => {
  try {
    signUpTemplatecopy
      .findOne({ email: req.body.email })
      .then((signUpTemplatecopy) => {
        if (signUpTemplatecopy) {
          bcrypt.compare(
            req.body.password,
            signUpTemplatecopy.password,
            (err, result) => {
              if (err) {
                resp.status(200).json({ error: err, message: "server error" });
              }
              if (result) {
                resp.status(200).json({
                  message: "validuser",
                  email: req.body.email,
                  data:signUpTemplatecopy,
                });
                console.log("sucess login");
              }
              if (!result) {
                resp.status(200).json({
                  message: "invalid password",
                });
                console.log("invalid password");
              }
            }
          );
        } else {
          resp.status(200).json({
            message: "invalid Email",
          });
          console.log("invalid Email");
        }
      });
  } catch (error) {
    console.log("email error");
    return resp
      .status(400)
      .json({ error: err, message: "email and password needed" });
  }
});

// to get informatiopn about a user with given email in profile pages

router.post("/profileGet", async (req, resp) => {
    try{
    signUpTemplatecopy.findOne({email:req.body.email})
    .exec((err,userdata)=>{
       if(err){
        req.json( {message : "user not found",});
        res.redirect("/");
       }else{
           resp.json(userdata);
       }
    });
    }
    catch(error){
        return resp
        .status(400)
        .json({ error: err, message: "Error fetching data" });
    }
});

// to edit the profile

router.put("/profileEdit", async (req, resp) => {
  try {
      console.log(req.body)
  if(req.body.password !== "")
  {
      salt = await bcrypt.genSalt(10);
      passvalue = await bcrypt.hash(req.body.password, salt);
  }
 else if(req.body.password ==="")
   {
       passvalue=req.body.hash;
    }

      const query = { "email": req.body.email };
      // Set some fields in that document
      const update = {
        "$set": {
          "name": req.body.name,
          "phone": req.body.phone,
          "password": passvalue,
          "address": req.body.address,
          "city": req.body.city,
          "zip": req.body.zip
          
        }
      };
      // Return the updated document instead of the original document
      const options = { returnNewDocument: true };
      return signUpTemplatecopy.findOneAndUpdate(query, update, options)
        .then(updatedDocument => {
          if(updatedDocument) {
            resp.status(200).json({ message: "profile updated"});

            console.log(`Successfully updated document: ${updatedDocument}.`)
          } else {
            resp.status(200).json({ message: "profile not updated"});
            console.log("No document matches the provided email.")
          }
          return updatedDocument
        })
        .catch(err => console.error(`Failed to find and update document: ${err}`))
      
  } catch (error) {
    return resp
      .status(400)
      .json({ error: error, message: "Error updating" });
  }
});

// complete user data from admin panel

router.get("/userdata", async (req, resp) => {
  try{
  signUpTemplatecopy.find({"usetype": { "$ne": "Admin"}})
  .exec((err,usersdata)=>{
     if(err){
      req.json( {message : "No users found"});
      res.redirect("/home");
     }else{
         resp.json(usersdata);
     }
  });
  }
  catch(error){
      return resp
      .status(400)
      .json({ error: err, message: "Error fetching data" });
  }
});

//activat and seactivate user in admin panel

router.put("/profileActivate", async (req, resp) => {
  try {
      console.log(req.body)
      const query = { "email": req.body.email };
      // Set some fields in that document
      const update = {
        "$set": {
          "status":req.body.action
        }
      };
      // Return the updated document instead of the original document
      const options = { returnNewDocument: true };
      return signUpTemplatecopy.findOneAndUpdate(query, update, options)
        .then(updatedDocument => {
          if(updatedDocument) {
            resp.status(200).json({ message: `Successfullly ${req.body.action}`});

            console.log(`Successfully updated document: ${updatedDocument}.`)
          } else {
            resp.status(200).json({ message: `Unsuccessfullly ${req.body.action}`});
            console.log("No user found")
          }
          return updatedDocument
        })
        .catch(err => console.error(`Failed to find and update document: ${err}`))
      
  } catch (error) {
    return resp
      .status(400)
      .json({ error: error, message: "Error updating" });
  }
});

router.get("/supplierprofile", async (req, resp) => {
  try{
  signUpTemplatecopy.find({usetype:"supplier"})
  .exec((err,userdata)=>{
     if(err){
      req.json( {message : "supplier not found",});
      res.redirect("/");
     }else{
         resp.json(userdata);
     }
  });
  }
  catch(error){
      return resp
      .status(400)
      .json({ error: err, message: "Error fetching data" });
  }
});


module.exports = router;
