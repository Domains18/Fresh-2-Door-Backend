// models/orderModel.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    shippingInfo: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    // Add more fields as needed (e.g., payment details, total price, etc.)
  },
  
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
