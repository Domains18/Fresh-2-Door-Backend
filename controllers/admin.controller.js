const Admin = require('../models/adminSchema');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




const newAdmin = expressAsyncHandler ( async(req, res)=>{
    const {name, email, password} = req.body;
});