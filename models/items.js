const mongoose =  require("mongoose")

const itemSchema = new mongoose.Schema({
  name: {type:String, required:true},
  brand: {type:String},
  image: {type:String},
  quantity: {type:Number, required:true},
  category: {type:String, required:true},
  expiration: {type:Date}
})

const Items = mongoose.model("Items", itemSchema)

module.exports = Items
