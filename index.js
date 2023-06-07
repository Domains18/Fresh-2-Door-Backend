require('dotenv').config();
const express = require('express')
const api = express();
const cors = require('cors');   
const colors = require('colors');
const bodyParser = require('body-parser');
const path = require('path');
const { eventLogger, logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')

// Middlewares
api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(express.static(path.join(__dirname, 'public')));



// Routes
api.use('/', require('./routers/root.router'));

api.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'public', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: 'Not found' });
    } else if (req.accepts('text')) {
        res.send('Not found');
    }
    
});


api.use(errorHandler)


api.listen(process.env.PORT, () => { console.log(`Server running on port ${process.env.PORT}`.yellow.bold) });
