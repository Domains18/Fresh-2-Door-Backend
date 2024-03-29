const crypto = require('crypto')
const secret = "unique_secret";

const generateRandomString = () => crypto.randomBytes(128).toString('base64');
const authentication = (salt, password) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('hex');
}



module.exports = { generateRandomString, authentication };