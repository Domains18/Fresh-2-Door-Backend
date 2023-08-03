const Admin = require('../models/adminSchema');
const { generateRandomString, authentication } = require('../helpers');
const expressAsyncHandler = require('express-async-handler');
const { OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('http-status-codes');

// Middleware to validate required fields

const registerAdmin = expressAsyncHandler(async (req, res) => {
    const { userName, email, password, phoneNumber } = req.body;
    if (!userName || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try {
        const salt = generateRandomString();
        const hashedPassword = authentication(salt, password);
        const admin = await Admin.create({
            userName,
            phoneNumber,
            email,
            password: hashedPassword,
            authentication: {
                salt,
                password: hashedPassword
            }
        });
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(400).json({ message: "Could not create admin" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Could not create admin" });
    }
});

const loginAdmin = expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const admin = await Admin.findOne({ email }).select('+authentication.salt +authentication.password');
        if (!admin) {
            return res.status(401).json("Email not registered");
        }
        const expectedHash = authentication(admin.authentication.salt, password);
        if (admin.authentication.password !== expectedHash) {
            return res.status(401).json('Authentication issues');
        }
        const salt = generateRandomString();
        admin.authentication.sessionToken = authentication(salt, admin._id.toString());
        await admin.save();
        res.cookie('authentication_cookie_admin', admin.authentication.sessionToken, { domain: 'localhost', path: '/' });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});


module.exports = { loginAdmin, registerAdmin };
