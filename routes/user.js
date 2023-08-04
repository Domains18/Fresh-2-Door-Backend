const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../services/user.service');

const {
    //products
    fetchProducts,
    fetchProductsByBatch,
} = require('../functions/admin');

module.exports = (router) => {
    //service routes functions
    router.post('/auth/user/login', loginUser);
    router.post('/auth/user/register', registerUser);

    //global routes functions(available to all users)
    router.get('/products', fetchProducts);
    router.get('/products/:batch', fetchProductsByBatch);

    //orderProduct routes functions
    
}