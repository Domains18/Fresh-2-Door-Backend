const express = require ('express');
const router = express.Router();




const { newUser, loginUser } = require('../services/user.service');

router.post('/new', newUser);
router.post('/login', loginUser);