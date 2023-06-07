require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');   // Cross Origin Resource Sharing
const colors = require('colors');

//inbuilt modules
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(colors);





app.listen(process.env.PORT, () => { console.log(`Server is running on port ${process.env.PORT}`) });
