
const mongoose =require('mongoose')
const Schema = mongoose.Schema;
const CartSchema = new Schema({


  duration: {
    type: Number
  },

})
const CartModel =mongoose.model("shopping_categs",CartSchema)
module.exports=CartModel