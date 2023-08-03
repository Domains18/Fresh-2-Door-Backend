const mongoose = require('mongoose');



const adminSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true, },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    },
    email: { type: String, required: [true, 'Email is required'], unique: true, },
    role: { type: String, default: 'admin' },
    phoneNumber: { type: String, required: true, unique: true, },
}, { timestamps: true });


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;