const express = require('express');
const router = express();

const { register_student, login_student, get_all_students, get_by_id, validate_token } = require('../controllers/StudentController');

router.get('/', (req, res) => {
    res.send('Student');
});

router.get('/get', get_all_students);
router.get('/get/:id', get_by_id);
router.post('/register', register_student);
router.post('/login', login_student);

//test
router.post('/validate_token', validate_token);

module.exports = router;