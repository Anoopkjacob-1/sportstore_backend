const express = require("express");
const router = express.Router();

const jerseyTemplatecopy = require("../models/CustomJerseyModel");

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

module.exports = router;
