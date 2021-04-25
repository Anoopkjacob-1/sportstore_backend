const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors');


const routesurl=require('./Router/router')
const productroutesurl=require('./Router/ProductRoutes')
const billurl=require('./Router/billRoutes')
const staffurl=require('./Router/supplierRoutes')
const chaturl=require('./Router/chat')


dotenv.config();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGO_BASE_ACESS,
  { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify: false},
  () => console.log("db connected")
);


app.use('/app',routesurl)
app.use('/product',productroutesurl)
app.use('/bill',billurl)
app.use('/supplier',staffurl)
app.use('/chat',chaturl)



app.listen(5000, () => {
  console.log("Server is running on Port");
});

