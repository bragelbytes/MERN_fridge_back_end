const express = require("express")
const router = express.Router()
const Items = require("../models/items.js")

//GET
router.get("/", (req, res) => {
  Items.find({}, (error, foundItems) => {
    res.json(foundItems)
  })
})

//DELETE
router.delete("/:id", (req, res) => {
  Items.findByIdAndRemove(req.params.id, (error, deletedItems) => {
    res.json(deletedItems)
  })
})

//POST
router.post("/", (req, res) => {
  Items.create(req.body, (error, createdItems) => {
    res.json(createdItems)
  })
})

//PUT(UPDATE)
router.put("/:id", (req, res) => {
  Items.findByIdAndUpdate(req.params.id, req.body, {new:true},
    (error, updatedItems) => {
      res.json(updatedItems)
    })
})

module.exports = router
