const express = require('express');
const router = express.Router();
const student = require('./student');



module.exports = () => {
    student(router);
    return router;
}