const mongoose = require('mongoose');
const DB_USER = process.env.MONGO_INITDB_ROOT_USERNAME;
const DB_PASS = process.env.MONGO_INITDB_ROOT_PASSWORD;

const connectDB = async() => {
    try {
        await mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@db:27017/`);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
    }   
}

module.exports = connectDB;