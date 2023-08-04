const mongoose = require('mongoose');



// Product schema
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: String, required: true },
  price: { type: Number, required: true },
  pieces: { type: Number, required: true },
  batch: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});



const Product = mongoose.model('Product', productSchema);
module.exports = Product;

const createProducts = (values) => new Product(values).save()
  .then((product)=>product.toObject());

const getProducts = () => Product.find({}).exec();  
const getProductsByBatch=(batch) => Product.findOne({batch}).exec();
const updateProduct = (id, values) => Product.findByIdAndUpdate(id, values).exec();
const deleteProduct = (id) => Product.findByIdAndDelete(id).exec();


module.exports = {
  createProducts,
  getProducts,
  getProductsByBatch,
  updateProduct,
  deleteProduct
}