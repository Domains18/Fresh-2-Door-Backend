const expressAsyncHandler = require('express-async-handler');
const Product = require('../models/productsSchema');



const fetchProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

const fetchProductById = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


const createProduct = expressAsyncHandler(async (req, res) => {
    const { name, weight, price, pieces, batch, image, description } = req.body;
    if (!name || !weight || !price || !pieces || !batch || !image || !description) {
        res.status(400);
        throw new Error('All fields are required');
    }
    try {
        const product = new Product({
            name,
            weight,
            price,
            pieces,
            batch,
            image,
            description
        });
        const createdProduct = await product.save();
        if (createdProduct) {
            res.status(201).json(createdProduct);
        } else {
            res.status(400);
            res.json({ message: "Product not created" });
        }
    } catch (error) {
        res.status(500);
        throw new Error(error);
    }
});

const updateProduct = expressAsyncHandler(async (req, res) => {
    const { name, weight, price, pieces, batch, image, description } = req.body;
    const productId = req.params.id;

    const updateFields = {
        name,
        weight,
        price,
        pieces,
        batch,
        image,
        description,
    };

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateFields, {
        new: true, // Return the updated product after update
        runValidators: true, // Run model validation after update
    });

    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});
