const express = require("express");
const router = express.Router();

const cartTemplateCopy = require("../models/CartModel");
const productTemplatecopy = require("../models/ProductModel");

router.post("/add", async (req, resp) => {
  try {
    // console.log(req.body)
 
    cartTemplateCopy
      .findOne({
        customerid: req.body.loginid,
        productid: req.body.productid,
        status: "cart",
      })
      .exec((err, carttabledata) => {
        if (err) {
          resp.json({ message: "cart error " });
        } else {
          if (carttabledata) {
            resp.json({ message: "Alread added to cart" });
          }
          if (!carttabledata) {
            const cartinstance = new cartTemplateCopy({
              productid: req.body.productid,
              customerid: req.body.loginid,
              quantity: req.body.quantity,
              totalprice: req.body.totalprice,
            });
            console.log(cartinstance);
            cartinstance
              .save()
              .then((data) => {
               

                // decrese quantity from producttbl
                const query1 = { "_id":req.body.productid};
                const update1 = {
                  "$inc": {
                    "quantity":-1
                  }
                };
                console.log(query1)
                const options = { returnNewDocument: true };
                return productTemplatecopy.findOneAndUpdate(query1, update1, options)
                  .then((productdata,err) => {
            
                      if(err) resp.json({ message: "server error" });
                      if(!productdata)  resp.json({ message: "no products" });
                      if(productdata){
                        resp.status(200).json({ message: "successfull" });
                      }
                  });

              })
              .catch((error) => {
                resp.status(400).json({ error: error, message: " error " });
              });
          }
        }
      });
  } catch (error) {
    return resp.status(400).json({ error: error, message: "Error updating" });
  }
});

router.post("/get", async (req, resp) => {
  try {
    console.log(req.body)
    cartTemplateCopy
      .find({ customerid: req.body.customerid, status: req.body.status })
      .populate("productid")
      .sort({ date: -1 })
      .exec((err, requestaddata) => {
        if (err) {
          resp.json({ message: "No request" });
        } else {
          resp.json(requestaddata);
        }
      });
  } catch (error) {
    return resp
      .status(400)
      .json({ error: err, message: "Error fetching data" });
  }
});


router.post("/total", async (req, resp) => {
  try {
    cartTemplateCopy.find({ customerid: req.body.customerid, status: "cart" })
    .exec((err, requestaddata) => {
        if (err) {
          resp.json({ message:"server error" });
        }
        if(!requestaddata)
        {
          resp.json({ message:"cart is empty" });
        }
        if(requestaddata.length!==0)
        {
          let val =0;
          let sum= requestaddata.map(item=>{return val=item.totalprice});
          let result=sum.reduce((a, b) => a + b);
          resp.json(result);
     }});
  } catch (error) {
    return resp
      .status(400)
      .json({ error: err, message: "Error fetching data" });
  }
});

router.post("/delete",async (req,resp) => {
  try{
    cartTemplateCopy.findOneAndDelete({"_id":req.body._id},(err)=>{
      if(err)
      {
        resp.json( {message : "server error"});
      }else{
       
                
        const query1 = { "productid":req.body.productid};
        const update1 = {
          "$inc": {
            "quantity":+req.body.quantity
          }
        };
        const options = { returnNewDocument: true };
        return productTemplatecopy.findOneAndUpdate(query1, update1, options)
          .then((productdata,err) => {
    
              if(err) resp.json({ message: "server error" });
              if(!productdata)  resp.json({ message: "no products" });
              if(productdata){
                resp.json( {message : "deleted"});
              }
          });
      }
    }
    )
  }catch (error) {
      return resp
        .status(400)
        .json({ error: error, message: "Error updating" });
    }
  });

  router.post("/plus", async (req, resp) => {

    try {        
    const query1 = { "productid":req.body.productid};
    const update1 = {
      "$inc": {
        "quantity":-1
      }
    };
    const options = { returnNewDocument: true };
    return productTemplatecopy.findOneAndUpdate(query1, update1, options)
      .then((productdata,err) => {

          if(err) resp.json({ message: "server error" });
          if(!productdata)  resp.json({ message: "no products" });
      
          if(productdata){
              const query = { "_id":req.body._id};
              const update = {
                "$inc": {
                  "totalprice":+req.body.unitprice,
                  "quantity":+1
                }
              };
              const options = { returnNewDocument: true };
              return cartTemplateCopy.findOneAndUpdate(query, update, options)
                .then(updatedDocument2 => {
                  if(updatedDocument2) {
                    resp.status(200).json({ message:"cart updated"});
                  } else {
                    resp.status(200).json({ message: "cart not updated"});
                  }
                  return updatedDocument2
                })
                .catch(err => console.error(`Failed to find and update document: ${err}`))
            
          }

        })
        .catch(err => console.error(`Failed to find and update document: ${err}`))

    } catch (error) {
      return resp
        .status(400)
        .json({ error: err, message: "Error fetching data" });
    }
  });
  


  router.post("/minus", async (req, resp) => {

    try {        
    const query1 = { "productid":req.body.productid};
    const update1 = {
      "$inc": {
        "quantity":+1
      }
    };
    const options = { returnNewDocument: true };
    return productTemplatecopy.findOneAndUpdate(query1, update1, options)
      .then((productdata,err) => {

          if(err) resp.json({ message: "server error" });
          if(!productdata)  resp.json({ message: "no products" });
      
          if(productdata){
              const query = { "_id":req.body._id};
              const update = {
                "$inc": {
                  "totalprice":-req.body.unitprice,
                  "quantity":-1
                }
              };
              const options = { returnNewDocument: true };
              return cartTemplateCopy.findOneAndUpdate(query, update, options)
                .then(updatedDocument2 => {
                  if(updatedDocument2) {
                    resp.status(200).json({ message:"cart updated"});
                  } else {
                    resp.status(200).json({ message: "cart not updated"});
                  }
                  return updatedDocument2
                })
                .catch(err => console.error(`Failed to find and update document: ${err}`))
            
          }

        })
        .catch(err => console.error(`Failed to find and update document: ${err}`))

    } catch (error) {
      return resp
        .status(400)
        .json({ error: err, message: "Error fetching data" });
    }
  });

  
router.post("/onlineorder", async (req, resp) => {
  try {
    console.log(req.body)
    cartTemplateCopy
      .find({ customerid: req.body.customerid, status: { $ne: "cart" } })
      .populate("productid")
      .sort({ date: -1 })
      .exec((err, requestaddata) => {
        if (err) {
          resp.json({ message: "No request" });
        } else {
          resp.json(requestaddata);
        }
      });
  } catch (error) {
    return resp
      .status(400)
      .json({ error: err, message: "Error fetching data" });
  }
});

  
module.exports = router;
