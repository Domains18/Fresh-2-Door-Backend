const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../services/user.service');


module.exports = (router)=>{
    //service routes functions
    router.post('/auth/user/login', loginUser);
    router.post('/auth/user/register', registerUser);
}