const express = require('express');
const router = express();

const { run_interpreter_code } = require('../controllers/InterpreterController');

router.post('/run', run_interpreter_code);

module.exports = router;