const express = require('express');
const router = express.Router();
const {getMyAdmin, updateMyAdmin, deleteMyAdmin} = require('../functions/admin');


module.exports = (router)=>{
    router.get('/admin/:id', getMyAdmin);
    router.patch('/admin/:id', updateMyAdmin);
    router.delete('/admin/:id', deleteMyAdmin);
}