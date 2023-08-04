const express = require('express');
const { merge, get } = require('lodash');
const Admin = require('../models/adminSchema');
const expressAsyncHandler = require('express-async-handler');

const getUserBySessionToken = (sessionToken) => Admin.findOne({ 'authentication.sessionToken': sessionToken }).exec();

const isOwner = expressAsyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id');
        if (!currentUserId) {
            return res.status(401).json("Please login first");
        }
        if (currentUserId.toString() !== id) {
            return res.status(403).json("You are not authorized to perform this action");
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }
});

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
    try {
        const sessionToken = req.cookies['authentication_cookie_admin'];
        if (!sessionToken) {
            return res.status(401).json("Please login first");
        }
        const admin = await getUserBySessionToken(sessionToken);
        if (!admin) {
            return res.status(401).json("User not found");
        }
        merge(req, { identity: admin });
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }
});

const isAdmin = expressAsyncHandler(async (req, res, next) => {
    try {
        const sessionToken = req.cookies['authentication_cookie_admin'];
        if (!sessionToken) {
            return res.status(401).json("Please login first");
        }
        const admin = await getUserBySessionToken(sessionToken);
        if (!admin) {
            return res.status(401).json("User not found");
        }
        if (admin.role !== 'admin') {
            return res.status(403).json("You are not authorized to perform this action");
        }
        merge(req, { identity: admin });
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong");
    }
});
module.exports = { isAuthenticated, isOwner, isAdmin };
