const express = require('express');
const router = express.Router();
const { getMyAdmin, updateMyAdmin, deleteMyAdmin } = require('../functions/admin');
const { isOwner, isAuthenticated } = require('../middleware/authMiddleware')
const {registerAdmin, loginAdmin} = require('../services/admin.service')

module.exports = (router) => {
    //service routes functions
    router.post('/auth/admin/login', loginAdmin);
    router.post('/auth/admin/register', registerAdmin);
    // Admin routes functions
    router.get('/admin/:id', isOwner, isAuthenticated, getMyAdmin);
    router.patch('/admin/:id', isOwner, isAuthenticated, updateMyAdmin);
    router.delete('/admin/:id', isOwner, isAuthenticated, deleteMyAdmin);
}