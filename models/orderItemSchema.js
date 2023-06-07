const mongoose = require('mongoose');




// Order item schema
const orderItemSchema = mongoose.Schema({
  orderItemId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});
