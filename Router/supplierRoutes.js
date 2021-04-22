const express = require("express");
const router = express.Router();


const RequestTemplateCopy = require("../models/RequestModel");

router.post("/requestadd", async (req, resp) => {
    try {
        console.log(req.body)
        if(req.body.supplier==="")
        {
            supplierid=req.body.supplierone
        }else
        {
          supplierid=req.body.supplier
        }
        RequestTemplateCopy.findOne({ "supplierid":supplierid,"productid":req.body.productid})
          .exec((err,reqtabledata)=>{
            if(err){
              resp.json( {message : "bill error "});
            }else{
              if(reqtabledata)
              {
                resp.json( {message : "Already requested"});
              }
                if(!reqtabledata)
                  
             {
                  const reqtableinstance = new RequestTemplateCopy({
                     productid: req.body.productid,
                     productname:req.body.productname,
                     subcategorey:req.body.subcategorey,
                     brand:req.body.brand,
                     size:req.body.size,
                     color:req.body.color,
                     units:req.body.units,
                     unitprice:req.body.unitprice,
                     Stockrequired:req.body.Stockrequired,
                     supplierid:supplierid
                  });
                  console.log(reqtableinstance);
                  reqtableinstance
                    .save()
                    .then((data) => {
                      resp.status(200).json({ message:"Requested"});
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
 
 
  router.get("/requestget", async (req, resp) => {
    try{
      RequestTemplateCopy.find({}).sort({date: -1})
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

 router.post("/reqtblDelete",async (req,resp) => {
    try{
      RequestTemplateCopy.findOneAndDelete({"_id":req.body.id},(err)=>{
        if(err)
        {
          resp.json( {message : "server error"});
        }else{
          resp.json( {message : "deleted"});
        }
      }
      )
    }catch (error) {
        return resp
          .status(400)
          .json({ error: error, message: "Error updating" });
      }
    });

module.exports = router;