const Admin = require("../models/adminSchema");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productsSchema");
const { createProducts, getProducts, getProductsByBatch, updateProduct, deleteProduct } = require('../models/productsSchema');

const getMyAdmin = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

const updateMyAdmin = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { email, phoneNumber } = req.body;
    try {
        if (!email || !phoneNumber) {
            return res.status(400).json({ message: "Email and phone number are required" });
        }
        const checkUser = await Admin.findOne({ email });
        checkUser.phoneNumber = req.body.phoneNumber;
        checkUser.email = req.body.email;
        await checkUser.save();
        res.status(200).json(checkUser).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

const deleteMyAdmin = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});


//create products
const createProduct = expressAsyncHandler(async (req, res) => {
    const { name, weight, price, pieces, batch, image, description } = req.body;
    try {
        if (!name || !weight || !price || !pieces || !batch || !image || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = await createProducts({
            name,
            weight,
            price,
            pieces,
            batch,
            image,
            description
        });
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

});

//get products
const fetchProducts = expressAsyncHandler(async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//get products by batch
const fetchProductsByBatch = expressAsyncHandler(async (req, res) => {
    const { batch } = req.params;
    try {
        const products = await getProductsByBatch(batch);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//update products
const updateProducts = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, weight, price, pieces, batch, image, description } = req.body;
    try {
        if (!name || !weight || !price || !pieces || !batch || !image || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = await updateProduct(id, {
            name,
            weight,
            price,
            pieces,
            batch,
            image,
            description
        });
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

//delete products
const deleteProducts = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const product = await deleteProduct(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = { getMyAdmin, updateMyAdmin, deleteMyAdmin, createProduct, fetchProducts,fetchProductsByBatch, updateProducts, deleteProducts
};