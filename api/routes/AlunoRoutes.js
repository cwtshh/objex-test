const express = require('express');
const router = express();

const {
    login_aluno,
    authenticate_token,
    update_senha,
    responder_atividade_imagem,
    entrar_grupo,
    get_all_members_by_id,
    get_by_id,
    sair_grupo
} = require('../controller/AlunosController');

router.get('/', (req, res) => {
    res.send('Aluno');
});

router.get('/get-all-members', authenticate_token, get_all_members_by_id);
router.get('/:id', authenticate_token, get_by_id);
router.post('/login', login_aluno);
router.post('/update/password', authenticate_token, update_senha);
router.post('/responder/imagem', responder_atividade_imagem);
router.patch('/entrar/grupo', authenticate_token, entrar_grupo);
router.patch('/sair/grupo', authenticate_token, sair_grupo);

module.exports = router;
