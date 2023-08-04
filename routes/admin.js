const express = require('express');
const router = express.Router();
const { 
    getMyAdmin, 
    updateMyAdmin, 
    deleteMyAdmin,
    //products
    createProduct,
    fetchProductsByBatch,
    updateProducts,
    deleteProducts
} = require('../functions/admin');

const { isOwner, isAuthenticated, isAdmin } = require('../middleware/adminAuth')
const { registerAdmin, loginAdmin } = require('../services/admin.service')

module.exports = (router) => {
    //service routes functions
    router.post('/auth/admin/login', loginAdmin);
    router.post('/auth/admin/register', registerAdmin);
    // Admin routes functions
    router.get('/admin/:id', isAuthenticated, isOwner, getMyAdmin);
    router.patch('/admin/:id', isAuthenticated, isOwner, updateMyAdmin);
    router.delete('/admin/:id', isAuthenticated, isOwner, deleteMyAdmin);

    // Product routes functions
    router.post('/admin/product', isAuthenticated, isAdmin, createProduct);
    router.get('/admin/product:batch', isAuthenticated, isAdmin, fetchProductsByBatch);
    router.patch('/admin/product/:id', isAuthenticated, isAdmin, updateProducts);
    router.delete('/admin/product/:id', isAuthenticated, isAdmin, deleteProducts);

}