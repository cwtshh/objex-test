require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

connectDB();

app.use(require('./routes/Router'));

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});