const express = require('express');
const router = express();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const { upload_image } = require('../controllers/ImageUploadController');

router.get('/', (req, res) => {
    res.send('Image');
});
router.post('/upload', upload.single('image'), upload_image);

module.exports = router;