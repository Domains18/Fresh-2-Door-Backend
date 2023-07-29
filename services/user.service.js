const User = require('../models/userschema');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, phoneNumber, email, password, location } = req.body;
    if (!name || !phoneNumber || !email || !password || !location) {
        res.status(400).send({ message: "Please fill all fields" });
    }
    const checkDuplicateEmail = await User.findOne({ email });
    if (checkDuplicateEmail) {
        res.status(400).send({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        name,
        phoneNumber,
        email,
        password: hashedPassword,
        location,
        accessToken: generateAccessToken(_id)
    });
    const savedUser = await user.save();
    if (savedUser) {
        res.status(201);
        res.json({
            _id: savedUser._id,
            name: savedUser.name,
            phoneNumber: savedUser.phoneNumber,
            email: savedUser.email,
        })
    } else {
        res.status(400).send({ message: "User could not be created" });
    }
});

const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({ message: "Please fill all fields" });
    }
    const isValidUser = await User.findOne({ email });
    if (!isValidUser) {
        res.status(400).send({ message: "Invalid email or password" });
    }
    if (isValidUser && (await bcrypt.compare(password, isValidUser.password))) {
        res.status(200);
        res.json({
            _id: isValidUser._id,
            name: isValidUser.name,
            phoneNumber: isValidUser.phoneNumber,
            email: isValidUser.email,
            accessToken: generateAccessToken(isValidUser._id)
        })
    } else {
        res.status(400).send({ message: "Invalid email or password" });
    }
});


const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}
