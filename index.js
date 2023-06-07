require('dotenv').config();
const express = require('express')
const api = express();
const cors = require('cors');   // Cross Origin Resource Sharing
const colors = require('colors');
const bodyParser = require('body-parser');
const path = require('path');

// Middlewares
api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use

// Routes
api.use('/', require('./routers/root.router'));






api.listen(process.env.PORT, () => { console.log(`Server running on port ${process.env.PORT}`.yellow.bold) });
