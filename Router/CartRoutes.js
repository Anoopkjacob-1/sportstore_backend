const express = require("express");
const router = express.Router();

const cartTemplateCopy = require("../models/CartModel");

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
                resp.status(200).json({ message: "successfull" });
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
    cartTemplateCopy
      .find({ customerid: req.body.customerid, status: "cart" })
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
