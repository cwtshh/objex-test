const mongoose = require('mongoose');
const DB_USER = process.env.MONGO_INITDB_ROOT_USERNAME;
const DB_PASS = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const connectDB = async() => {
    await mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@db:${DB_PORT}/`).then(res => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.log('Error connecting to MongoDB');
        console.log(err);  
    });
};

module.exports = connectDB;