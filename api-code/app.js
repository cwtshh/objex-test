require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.API_PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', require('./Routes/Router'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});