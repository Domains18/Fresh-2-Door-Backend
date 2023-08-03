const Admin = require("../models/adminSchema");
const expressAsyncHandler = require("express-async-handler");
const getMyAdmin = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

const updateMyAdmin = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { email, phoneNumber } = req.body;
    try {
        if (!email || !phoneNumber) {
            return res.status(400).json({ message: "Email and phone number are required" });
        }
        const checkUser = await Admin.findOne({ email });
        checkUser.phoneNumber = req.body.phoneNumber;
        checkUser.email = req.body.email;
        await checkUser.save();
        res.status(200).json(checkUser).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

const deleteMyAdmin = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = { getMyAdmin, updateMyAdmin, deleteMyAdmin };