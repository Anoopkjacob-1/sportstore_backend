const express = require("express");
const router = express.Router();
const {v4 : uuidv4} = require('uuid')

const categoreyTemplatecopy = require("../models/CategoreyModels");
const brandTemplatecopy = require("../models/BrandModels");
const subcategoreyTemplatecopy = require("../models/SubcategoreyModel");


//                                                     CATEGOREY ROUTES
//                                                     ---------------



// TO ADD CATEGOREY TO CATEGOREY TABLE

router.post("/categoreyAdd", async (req, resp) => {
     
  const categoreyId = uuidv4()
  try{
        categoreyTemplatecopy.findOne({categoreyname:req.body.categoreyname})
        .exec((err,catdata)=>{
          if(err){
            resp.json( {message : "categore error "});
          }else{
            if(catdata)
            {
              resp.json( {message : "category alreday exist"});
            }
              if(!catdata)
                  // add to categorey
           {
                const Categoreyinstance = new categoreyTemplatecopy({
                    categoreyname: req.body.categoreyname,
                    categoreyid:categoreyId
                });
                console.log(req.body);
                Categoreyinstance
                  .save()
                  .then((data) => {
                    resp.status(200).json({ message:"categorey added",DATA:data});
                  })
                  .catch((error) => {
                    resp.status(400).json({ error: error, message: " error " });
                  });
             }      
          }
        });
    }
    catch(error){
        return resp
        .status(400)
        .json({ error: error, message: "Error fetching data" });
    }
    
   
  });


// TO GET DATA FROM CATEGOREY TABLE
 
router.get("/categoreyGet", async (req, resp) => {
    try{
    categoreyTemplatecopy.find({})
    .exec((err,Categoreydata)=>{
       if(err){
        resp.json( {message : "categorey none"});
       }else{
           resp.json(Categoreydata);
       }
    });
    }
    catch(error){
        return resp
        .status(400)
        .json({ error: err, message: "Error fetching data" });
    }
  });


// TO UPDATE CATEGOREY IN CATEGOREY TABLE 

router.put("/categoreyUpdate", async (req, resp) => {
    try {
        console.log(req.body)
        const query = { "categoreyid":req.body.categoreyid};
        // Set some fields in that document
        const update = {
          "$set": {
            "categoreyname":req.body.categoreyname
          }
        };
        // Return the updated document instead of the original document
        const options = { returnNewDocument: true };
        return categoreyTemplatecopy.findOneAndUpdate(query, update, options)
          .then(updatedDocument => {
            if(updatedDocument) {
              resp.status(200).json({ message: "categorey updated"});
  
              console.log(`Successfully updated document: ${updatedDocument}.`)
            } else {
              resp.status(200).json({ message: "categorey not updated"});
              console.log("categorey not valid.")
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


 //                                                   BRAND ROUTES 
//                                                    -----------


// TO ADD BRAND TO BARND TABLE

router.post("/brandAdd", async (req, resp) => {
     
  const brandId = uuidv4()
  try{
     brandTemplatecopy.findOne({brandname:req.body.brandname})
        .exec((err,branddata)=>{
          if(err){
            resp.json( {message : "brand error "});
          }else{
            if(branddata)
            {
              resp.json( {message : "brand alreday exist"});
            }
              if(!branddata)
                  // add to brand
           {
                const Brandinstance = new brandTemplatecopy({
                    brandname: req.body.brandname,
                    brandid:brandId
                });
                console.log(req.body);

                Brandinstance
                  .save()
                  .then((data) => {
                    resp.status(200).json({ message:"brand added",DATA:data});
                  })
                  .catch((error) => {
                    resp.status(400).json({ error: error, message: " error " });
                  });
             }      
          }
        });
    }
    catch(error){
        return resp
        .status(400)
        .json({ error: error, message: "Error fetching data" });
    }  
  });


// TO GET DATA FROM BRAND TABLE
 
router.get("/brandGet", async (req, resp) => {
  try{
    brandTemplatecopy.find({})
  .exec((err,Branddata)=>{
     if(err){
      resp.json( {message : "brand none"});
     }else{
         resp.json(Branddata);
     }
  });
  }
  catch(error){
      return resp
      .status(400)
      .json({ error: err, message: "Error fetching data" });
  }
});  

// TO UPDATE CATEGOREY IN CATEGOREY TABLE 

router.put("/brandUpdate", async (req, resp) => {
  try {
      console.log(req.body)
      const query = { "brandid":req.body.brandid};
      // Set some fields in that document
      const update = {
        "$set": {
          "brandname":req.body.brandname
        }
      };
      // Return the updated document instead of the original document
      const options = { returnNewDocument: true };
      return brandTemplatecopy.findOneAndUpdate(query, update, options)
        .then(updatedDocument => {
          if(updatedDocument) {
            resp.status(200).json({ message: "brand updated"});

            console.log(`Successfully updated document: ${updatedDocument}.`)
          } else {
            resp.status(200).json({ message: "brand not updated"});
            console.log("brand not valid.")
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



 //                                                   SUBCATEGOREY ROUTES 
//                                                    -----------


// TO ADD SUBCATEGOREY TO SUBCATEGOREY TABLE

router.post("/subcategoreyAdd", async (req, resp) => {
     
  const subCatId = uuidv4()
  try{
    subcategoreyTemplatecopy.findOne({subcategoreyname:req.body.subcatname})
        .exec((err,subCatdata)=>{
          if(err){
            resp.json( {message : "subcategorey error "});
          }else{
            if(subCatdata)
            {
              resp.json( {message : "subcategorey alreday exist"});
            }
              if(!subCatdata)
                  // add to subcategorey
           {
                const subCatinstance = new subcategoreyTemplatecopy({

                  subcategoreyname: req.body.subcatname,
                  categoreyno:req.body.categoreydrop,
                  brandno:req.body.branddrop,
                  subcategoreyid:subCatId
                });
                console.log(req.body);
                subCatinstance
                  .save()
                  .then((data) => {
                    resp.status(200).json({ message:"subcategorey added",DATA:data});
                  })
                  .catch((error) => {
                    resp.status(400).json({ error: error, message: " error " });
                  });
             }      
          }
        });
    }
    catch(error){
        return resp
        .status(400)
        .json({ error: error, message: "Error fetching data" });
    }  
  });


module.exports = router;