const mongoose = require('mongoose');

mongoose.set('strictQuery', true);


const mongooseInstance = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongo_db);
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = { mongooseInstance };