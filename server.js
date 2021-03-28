const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors');


const routesurl=require('./Router/router')


// const PORT = 4000;
// app.use(cors());
// app.use(bodyParser.json());
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGO_BASE_ACESS,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("db connected")
);


app.use('/app',routesurl)

app.listen(5000, () => {
  console.log("Server is running on Port");
});
