const express = require('express');
const router = express.Router();


const { newAdmin, loginAdmin } = require('../services/admin.service');


router.post('/new', newAdmin);
router.post('/login', loginAdmin);


module.exports = router;