const express = require("express");
const router = express.Router();

const jerseyTemplatecopy = require("../models/CustomJerseyModel");
const JerseyChatTemplatecopy = require("../models/jerseychatModel");

router.post("/add", async (req, resp) => {
  try {
    if (req.body.default === "") {
      defaultvalue = "not selected";
    } else {
      defaultvalue  = req.body.default;
    }
    if (req.body.imageurl === "") {
       imagevalue = "not selected";
    } else {
      imagevalue = req.body.imageurl;
    }
    jerseyTemplatecopy.find({}).exec((err, jerseyData) => {
      if (err) {
        resp.json({ message: "server error " });
      } else {
        if (jerseyData) {
          const jerseyInstance = new jerseyTemplatecopy({
            userid: req.body.loginid,
            default:defaultvalue,
            primarycolor: req.body.primarycolor,
            Secondarycolor: req.body.Secondarycolor,
            imageurl:imagevalue,
            sizeandnoof: req.body.sizeandnoof,
            discrption: req.body.discrption,
          });
          console.log(req.body);
          jerseyInstance
            .save()
            .then((data) => {
              resp.status(200).json({ message: "successfull" });
            })
            .catch((error) => {
              resp.status(400).json({ error: error, message: " error " });
            });
        }
      }
    });
  } catch (error) {
    return resp
      .status(400)
      .json({ error: error, message: "Error fetching data" });
  }
});

 
router.get("/jerseyrequestget", async (req, resp) => {
  try{
    jerseyTemplatecopy.find({}).sort({date: -1}).populate("userid")
  .exec((err,requestddata)=>{
     if(err){
      resp.json( {message : "no request"});
     }else{
         resp.json(requestddata);
     }
  });
  }
  catch(error){
      return resp
      .status(400)
      .json({ error: err, message: "Error fetching data" });
  }
}); 


router.put("/ACCEPT", async (req, resp) => {
  try {
      console.log(req.body)
      const query = { "_id":req.body.id}; 
      const update = {
        "$set": {
          "status":"Accept"
        }
      };
      // Return the updated document instead of the original document
      const options = { returnNewDocument: true };
      return jerseyTemplatecopy.findOneAndUpdate(query, update, options)
        .then(updatedDocument1 => {
          if(updatedDocument1) {
            resp.status(200).json({ message: "Accepted"});

            console.log(`Successfully Accepted ${updatedDocument1}.`)
          } else {
            resp.status(200).json({ message: "Accepted failed"});
            console.log("Accepted failed")
          }
          return updatedDocument1
        })
        .catch(err => console.error(`Failed to find and update document: ${err}`))
      
  } catch (error) {
    return resp
      .status(400)
      .json({ error: error, message: "Error updating" });
  }
});


router.put("/REJECT", async (req, resp) => {
try {
console.log(req.body)
const query = { "_id":req.body.id};
const update = {
  "$set": {
    "status":"Reject"
  }
};
// Return the updated document instead of the original document
const options = { returnNewDocument: true };
return jerseyTemplatecopy.findOneAndUpdate(query, update, options)
  .then(updatedDocument1 => {
    if(updatedDocument1) {
      resp.status(200).json({ message: "Reject"});

      console.log(`Successfully Reject ${updatedDocument1}.`)
    } else {
      resp.status(200).json({ message: "Reject failed"});
      console.log("Reject failed")
    }
    return updatedDocument1
  })
  .catch(err => console.error(`Failed to find and update document: ${err}`))    
} catch (error) {
return resp
  .status(400)
  .json({ error: error, message: "Error updating" });
}
});


router.put("/FinalAccept", async (req, resp) => {
  try {
      console.log(req.body)
      const query = { "_id":req.body.id}; 
      const update = {
        "$set": {
          "status":"FinalAccept"
        }
      };
      // Return the updated document instead of the original document
      const options = { returnNewDocument: true };
      return jerseyTemplatecopy.findOneAndUpdate(query, update, options)
        .then(updatedDocument1 => {
          if(updatedDocument1) {
            resp.status(200).json({ message: "FinalAccept"});

            console.log(`Successfully FinalAccept ${updatedDocument1}.`)
          } else {
            resp.status(200).json({ message: "FinalAccept failed"});
            console.log("FinalAccept failed")
          }
          return updatedDocument1
        })
        .catch(err => console.error(`Failed to find and update document: ${err}`))
      
  } catch (error) {
    return resp
      .status(400)
      .json({ error: error, message: "Error updating" });
  }
});

router.put("/FinalReject", async (req, resp) => {
  try {
  console.log(req.body)
  const query = { "_id":req.body.id};
  const update = {
    "$set": {
      "status":"FinalReject"
    }
  };
  // Return the updated document instead of the original document
  const options = { returnNewDocument: true };
  return jerseyTemplatecopy.findOneAndUpdate(query, update, options)
    .then(updatedDocument1 => {
      if(updatedDocument1) {
        resp.status(200).json({ message: "FinalReject"});
  
        console.log(`Successfully FinalReject ${updatedDocument1}.`)
      } else {
        resp.status(200).json({ message: "FinalReject failed"});
        console.log("FinalReject failed")
      }
      return updatedDocument1
    })
    .catch(err => console.error(`Failed to find and update document: ${err}`))    
  } catch (error) {
  return resp
    .status(400)
    .json({ error: error, message: "Error updating" });
  }
  });

         


router.post("/requestgetwithid", async (req, resp) => {
  try{
    jerseyTemplatecopy.find({userid:req.body.userid}).sort({date: -1})
  .exec((err,requestaddata)=>{
     if(err){
      resp.json( {message : "No request"});
     }else{
         resp.json(requestaddata);
     }
  });
  }
  catch(error){
      return resp
      .status(400)
      .json({ error: err, message: "Error fetching data" });
  }
});



router.put("/AMOUNTSEND", async (req, resp) => {
  try {
  console.log(req.body)
  const query = { "_id":req.body.id};
  const update = {
    "$set": {
      "Amount":req.body.amount
    }
  };
  // Return the updated document instead of the original document
  const options = { returnNewDocument: true };
  return jerseyTemplatecopy.findOneAndUpdate(query, update, options)
    .then(updatedDocument1 => {
      if(updatedDocument1) {
        resp.status(200).json({ message: "AMOUNT SEND"});
  
        console.log(`Successfully Reject ${updatedDocument1}.`)
      } else {
        resp.status(200).json({ message: "AMOUNT SEND failed"});
        console.log("AMOUNT SEND failed")
      }
      return updatedDocument1
    })
    .catch(err => console.error(`Failed to find and update document: ${err}`))    
  } catch (error) {
  return resp
    .status(400)
    .json({ error: error, message: "Error updating" });
  }
  });



  router.post("/chatinsert", async (req, resp) => {
    try {

      JerseyChatTemplatecopy.findOne({jerseyorderid:req.body._id})
      .exec((err,chatdata)=>{
        if(err){
          resp.json( {message :" error "});
        }else{
     if(chatdata)
     {
      const query = { "requestid":req.body._id };
      const update = {
        "$push":  {
        "message": 
        [{ 
           "user":req.body.user,
          "content":req.body.text 
        }] 
      }
    };
        const options = { returnNewDocument: true };
        return JerseyChatTemplatecopy.findOneAndUpdate(query, update, options)
          .then(updatedDocument => {
            if(updatedDocument) {
              resp.status(200).json({ message: "message sended"});
  
              console.log(`message sended ${updatedDocument}.`)
            } else {
              resp.status(200).json({ message: "message not send"});
              console.log("No message sended")
            }
            return updatedDocument
          });
     }
       if(!chatdata)
              
         {
              const chattinstance = new JerseyChatTemplatecopy({
                jerseyorderid: req.body._id,
                  message:[{ 
                    user:req.body.user,
                    content:req.body.text
                         }]
              });
              console.log(req.body);
              chattinstance
                .save()
                .then((data) => {
                  resp.status(200).json({ message:"message sended",DATA:data});
                })
                .catch((error) => {
                  resp.status(400).json({ error: error, message: " error " });
                });
           }      
        }
      });
           
    } catch (error) {
      return resp
        .status(400)
        .json({ error: error, message: "Error updating" });
    }
  });
 
 
  router.post("/chatget", async (req, resp) => {
    
    try{
      JerseyChatTemplatecopy.find({jerseyorderid:req.body._id})
    .exec((err,requestddata)=>{
       if(err){
        resp.json( {message : "no request"});
       }else{
           resp.json(requestddata);
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






