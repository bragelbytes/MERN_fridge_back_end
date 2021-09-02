//dependencies
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const session = require("express")
const app = express()
const db = mongoose.connection
const itemsController = require("./controllers/items.js")
require("dotenv").config()

//config
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;

//Middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.json())
app.use(cors())
app.use("/items", itemsController)

//Error
db.on("error", (error) => console.log(error.message + " did you run MONGOD??"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

app.listen(PORT, () => {
  console.log("listening for ITEMS on port: ", PORT);
})
mongoose.connect(
  MONGODB_URI,
  {useNewUrlParser:true, useUnifiedTopology:true},
  () => {
    console.log("connected to mongod");
  }
)
