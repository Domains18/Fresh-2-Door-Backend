const mongoose = require('mongoose');



// Order schema
const orderSchema = mongoose.Schema({
  orderId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalCost: { type: Number, required: true },
  status: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  shippingAddress: { type: String, required: true }
});



module.exports = mongoose.model('Order', orderSchema);
