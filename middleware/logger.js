const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path');


const eventLogger = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            console.log('Logs folder not found, running instance to create "Logs" folder');
            await fsPromises.mkdir(path.join(__dirname, '..', 'Logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'Logs', logFileName), logItem);
    } catch (error) {
        throw new Error(error);
    }
}

const logger = (req, res, next) => {
    eventLogger(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    next();
}

module.exports = { eventLogger, logger}
