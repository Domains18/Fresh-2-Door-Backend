const mongoose = require('mongoose');

// User schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true }
});

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

// Cart item schema
const cartItemSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

// Order schema
const orderSchema = mongoose.Schema({
  orderId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalCost: { type: Number, required: true },
  status: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  shippingAddress: { type: String, required: true }
});

// Order item schema
const orderItemSchema = mongoose.Schema({
  orderItemId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});


// Create the models from the schemas
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);
const Order = mongoose.model('Order', orderSchema);
const OrderItem = mongoose.model('OrderItem', orderItemSchema);


// Export the models
module.exports = {
  User,
  Product,
  CartItem,
  Order,
  OrderItem
};
