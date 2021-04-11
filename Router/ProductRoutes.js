const express = require("express");
const router = express.Router();
const {v4 : uuidv4} = require('uuid')
const categoreyTemplatecopy = require("../models/CategoreyModels");

// to add categorey to catgorey table

router.post("/categoreyAdd", async (req, resp) => {
     
  const categoreyId = uuidv4()
  try{
        categoreyTemplatecopy.findOne({categoreyname:req.body.categoreyname})
        .exec((err,userdata)=>{
          if(err){
            resp.json( {message : "categore error "});
          }else{
            if(userdata)
            {
              resp.json( {message : "category alreday exist"});
            }
              if(!userdata)
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


// to get data from catgorey table
 
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

module.exports = router;