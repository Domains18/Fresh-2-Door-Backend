const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../services/user.service');


module.exports = (router)=>{
    router.post('/auth/login', loginUser);
    router.post('/auth/register', registerUser);
}