const express = require('express');
const router = express.Router();
const { getMyAdmin, updateMyAdmin, deleteMyAdmin } = require('../functions/admin');
const { isOwner, isAuthenticated } = require('../middleware/adminAuth')
const { registerAdmin, loginAdmin } = require('../services/admin.service')

module.exports = (router) => {
    //service routes functions
    router.post('/auth/admin/login', loginAdmin);
    router.post('/auth/admin/register', registerAdmin);
    // Admin routes functions
    router.get('/admin/:id', isAuthenticated, isOwner, getMyAdmin);
    router.patch('/admin/:id', isAuthenticated, isOwner, updateMyAdmin);
    router.delete('/admin/:id', isAuthenticated, isOwner, deleteMyAdmin);
}