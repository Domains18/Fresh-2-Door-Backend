const { generateRandomString, authentication } = require('../helpers');
const User = require('../models/userschema');
const expressAsyncHandler = require('express-async-handler');
const { OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('http-status-codes');

// Middleware to validate required fields

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, phoneNumber, email, password, location } = req.body;
    if (!name || !phoneNumber || !email || !password || !location) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try {
        const salt = generateRandomString();
        const hashedPassword = authentication(salt, password);
        const user = await User.create({
            name,
            phoneNumber,
            email,
            password: hashedPassword,
            location,
            authentication: {
                salt,
                password: hashedPassword
            }
        });
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Could not create user" });
    }
});

const loginUser = expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const user = await User.findOne({ email }).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.status(401).json("Email not registered");
        }
        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.status(401).json('Authentication issues');
        }
        const salt = generateRandomString();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        res.cookie('authentication_cookie', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = { loginUser, registerUser };
