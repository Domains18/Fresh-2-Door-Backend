const express = require('express');
const { merge, get } = require('lodash');
const User = require('../models/userschema');
const expressAsyncHandler = require('express-async-handler');
const getUserBySessionToken = (sessionToken) => User.findOne({ 'authentication.sessionToken': sessionToken }).exec();


const isOwner = expressAsyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = (get, `identity._id`);
        if (!currentUserId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if(currentUserId !== id){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
});

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
    try {
        const sessionToken = req.cookies['authentication_cookie'];
        if (!sessionToken) {
            res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await getUserBySessionToken(sessionToken);
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
        }
        merge(req, { identity: user });
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({ message: 'something went wrong' });
    }
});


module.exports = { isAuthenticated, isOwner }