const express = require('express');
const router = express();

const {
    register_aluno,
    login_aluno,
    authenticate_token
} = require('../controller/AlunosController');

router.get('/', (req, res) => {
    res.send('Aluno');
});

router.post('/login', login_aluno);

module.exports = router;
