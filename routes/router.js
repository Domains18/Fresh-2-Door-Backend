const express = require('express');
const router = express.Router();
const user = require('./user');
const admin = require('./admin');


module.exports = () => {
    user(router);
    return router;
}