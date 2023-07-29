const Admin = require('../models/adminSchema');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




const newAdmin = expressAsyncHandler(async (req, res) => {
    const { userName, password, email, role } = req.body;

    if (!userName || !password || !email) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    try {
        const checkDuplicate = await Admin.findOne({ email });
        if (checkDuplicate) {
            res.status(400).json({ message: 'Email already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const admin = new Admin({
            userName,
            password: hashedPassword,
            email,
            role,
            accessToken: generateAccessToken(_id)
        });
        const savedAdmin = await admin.save();
        if (savedAdmin) {
            res.status(201).json({ message: 'Admin created successfully' });
        } else {
            res.status(400).json({ message: 'Admin could not be created' });
        }
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const loginAdmin = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    try {
        const findAdmin = await Admin.findOne({ email }).select('-password');
        switch (findAdmin) {
            case !findAdmin:
                res.status(400).json({ message: 'Invalid credentials' });
                break;
            default:
                const matchPassword = await bcrypt.compare(password, findAdmin.password);
                if (!matchPassword) {
                    res.status(400).json({ message: 'Invalid credentials' });
                }
                res.status(200).json({ message: 'Login successful', admin: findAdmin });
                break;
        }
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});


async function generateAccessToken(id) {
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}