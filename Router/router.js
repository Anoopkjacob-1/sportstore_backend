const express = require("express");
const router = express.Router();
const signUpTemplatecopy = require("../models/SignUpModels");
const bcrypt = require("bcrypt");

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

router.put("/profileEdit", async (req, resp) => {
  try {
      console.log(req.body)
  if(req.body.passvalue !== "")
  {
      salt = await bcrypt.genSalt(10);
      passvalue = await bcrypt.hash(req.body.password, salt);
  }
 else if(req.body.passvalue ==="")
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

module.exports = router;
