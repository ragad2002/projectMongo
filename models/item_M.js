const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  catg: String,
});

const ItemModel = mongoose.model('Item', itemSchema);
module.exports=ItemModel