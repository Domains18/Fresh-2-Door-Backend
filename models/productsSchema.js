const mongoose = require('mongoose');



// Product schema
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  price: { type: Number, required: true },
  pieces: { type: Number, required: true },
  batch: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});



module.exports = mongoose.model('Product', productSchema);
