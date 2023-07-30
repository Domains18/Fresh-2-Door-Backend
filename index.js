require('dotenv').config();
const express = require('express')
const api = express();
const cors = require('cors');
const colors = require('colors');
const bodyParser = require('body-parser');

const { mongooseInstance } = require('./database');
const { errorHandler } = require('./middleware/errorHandler');
const { default: mongoose } = require('mongoose');

// Middlewares
api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(errorHandler);


//database 
Promise = mongooseInstance();


api.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`.yellow.bold);
    console.log("opening attempts to connect to mongodb..............".dim);
});

mongoose.connection.once('open', ()=>{
    console.log(`successfully pinged connection with mongodb at ${mongoose.connection.host}: ${mongoose.connection.port}`.green.bold);
});

mongoose.connection.on('error', (err)=>{
    console.log(`Error connecting to mongodb`, err);
});