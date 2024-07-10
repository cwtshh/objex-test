const express = require('express');
const router = express();

const { get_all } = require('../controller/GruposController');

router.get("/get-all", get_all);


module.exports = router;