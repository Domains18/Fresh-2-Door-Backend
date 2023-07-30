require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const colors = require('colors');
const bodyParser = require('body-parser');

const { mongooseInstance } = require('./database');
const { errorHandler } = require('./middleware/errorHandler');
const { default: mongoose } = require('mongoose');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


//database 
Promise = mongooseInstance();

app.use('/users', require('./routes/userRoute'));
app.use('/admins', require('./routes/adminRoute'));

app.use(errorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`.yellow.bold);
    console.log("opening attempts to connect to mongodb..............".dim);
});

mongoose.connection.once('open', () => {
    console.log(`successfully pinged connection with mongodb at ${mongoose.connection.host}: ${mongoose.connection.port}`.green.bold);
});

mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to mongodb`, err);
});