const bcrypt = require("bcrypt")
const express = require("express")
const users = express.Router()
const User = require("../models/user.js")

users.get("/", (req, res) => {
  User.find({}, (error, foundUser) => {
    res.json(foundUser)
  })
})

users.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log("User is created: ", createdUser);
  })
})

users.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (error, deletedUser) => {
    res.json(deletedUser)
  })
})

users.put("/", (req, res) => {
  User.findOne({username: req.body.username}, (error, foundUser) => {
    if(error){
      console.log(error);
      res.json("error with the db")
    } else if(!foundUser){
      res.json("user not found")
    } else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        res.json({username: foundUser.username})
      } else {
        res.json("incorrect password")
      }
    }
  })
})
module.exports = users
