const express = require('express');
const router = express();

const { register_professor, login_professor, authenticate_token, register_aluno, verify_token } = require('../controller/ProfessorController');

router.get('/', (req, res) => {
    res.send('Professor');
});

router.post('/register/temp', register_professor);
router.post('/register', authenticate_token, register_professor);
router.post('/login', login_professor);
router.post('/register/aluno', authenticate_token, register_aluno);
router.post('/verify', verify_token);


module.exports = router;