const express = require('express');
const router = express();

const { register_student, login_student } = require('../controllers/StudentController');

router.get('/', (req, res) => {
    res.send('Student');
});

router.post('/register', register_student);
router.post('/login', login_student);


module.exports = router;