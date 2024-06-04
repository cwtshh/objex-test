const express = require('express');
const router = express();
const { upload, run_python_code} = require('../controllers/FileController');
const File = require('../models/File');
const path = require('path');

router.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({ message: 'File uploaded', file: req.file });
});
router.post('/run', run_python_code);


module.exports = router;