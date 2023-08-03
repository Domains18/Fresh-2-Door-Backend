const User = require('../models/userschema');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateRandomString, authentication } = require('../helpers');



const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, phoneNumber, email, password, location } = req.body;
    if (!name || !phoneNumber || !email || !password || !location) {
        res.status(400).send({ message: "Please fill all fields" });
    }
    const checkDuplicateEmail = await User.findOne({ email });
    if (!checkDuplicateEmail) {
        return res.sendStatus(400);
    }
    const salt = generateRandomString();
    const user = await User.create({
        name, phoneNumber, email, email, password, location,
        authentication: {
            salt,
            password: authentication(salt, password)
        }
    });
    if (user) {
        return res.sendStatus(200).json(user);
    } else {
        res.status(400);
        throw new Error("could not create user");
        return;
    }
});

const loginUser = expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send({ message: "Please fill all fields" });
        }
        const user = await User.findOne(email).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.sendStatus(200).json("email not registered");
        }
        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(401).json('authentication issues');
        }
        const salt = generateRandomString();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        res.cookie('authentication_cookie', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
        res.status(200).json(user).end();
    } catch (error) {
        throw new Error(error);
        return res.sendStatus(500).json('something went wrong');
    }
});



module.exports = { loginUser, registerUser };