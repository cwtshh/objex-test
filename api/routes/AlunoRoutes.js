const express = require('express');
const router = express();

const {
    login_aluno,
    authenticate_token,
    update_senha,
    responder_atividade_imagem
} = require('../controller/AlunosController');

router.get('/', (req, res) => {
    res.send('Aluno');
});

router.post('/login', login_aluno);
router.post('/update/password', authenticate_token, update_senha);
router.post('/responder/imagem', responder_atividade_imagem);

module.exports = router;
