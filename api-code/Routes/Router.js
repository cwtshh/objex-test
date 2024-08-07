const express = require('express');
const router = express();


const { run_interpreter } = require('../controller/CodeController');

router.get('/', (req, res) => {
    res.send('code api is working');
});

router.post('/run', run_interpreter);



module.exports = router;
