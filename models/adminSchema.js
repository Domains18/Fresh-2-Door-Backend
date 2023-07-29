const mongoose = require('mongoose');



const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    role: {
        type: String,
        default: 'admin'
    },
}, { timestamps: true });


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;