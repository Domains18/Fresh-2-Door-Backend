const express = require('express');
const router = express.Router();




const { registerUser, loginUser } = require('../services/user.service');

router.post('/new', registerUser);
router.post('/login', loginUser);


module.exports = router;