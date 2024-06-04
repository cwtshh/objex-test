require('dotenv').config();
const express = require('express');
const app = express();
const API_PORT = process.env.API_PORT || 3000;
const connectDB = require('./config/db');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

/* app.use("/file", require('./upload')); */

connectDB();

const router = require('./routes/Router');
app.use(router);

app.listen(API_PORT, () => {
    console.log(`Server is running on port ${API_PORT}`)
})
