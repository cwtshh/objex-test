const express = require('express');
const router = express();

const { 
    register_professor, 
    login_professor, 
    authenticate_token, 
    register_aluno, 
    verify_token,
    create_group,
    get_professores_name_id,
    create_turma,
    get_turmas
} = require('../controller/ProfessorController');

router.get('/', (req, res) => {
    res.send('Professor');
});

router.post('/register/temp', register_professor);
router.post('/register', authenticate_token, register_professor);
router.post('/login', login_professor);
router.post('/register/aluno', authenticate_token, register_aluno);
router.post('/verify', verify_token);
router.post('/create/grupo', authenticate_token, create_group);
router.post('/create/turma', authenticate_token, create_turma);


router.get('/get-all', authenticate_token, get_professores_name_id);
router.get('/get-turmas', authenticate_token, get_turmas);

module.exports = router;