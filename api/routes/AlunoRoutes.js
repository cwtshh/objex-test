const express = require('express');
const router = express();

const {
    login_aluno,
    authenticate_token,
    update_senha
} = require('../controller/AlunosController');

router.get('/', (req, res) => {
    res.send('Aluno');
});

router.post('/login', login_aluno);
router.post('/update/password', authenticate_token, update_senha);

module.exports = router;
