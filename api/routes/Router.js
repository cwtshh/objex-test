const express = require('express');
const router = express();

router.get('/', (req, res) => {
    res.send('API FUNCIONANDO!');
});

router.use('/professor', require('./ProfessorRoutes'));
router.use('/grupo', require('./GrupoRoutes'));
router.use('/aluno', require('./AlunoRoutes'));

module.exports = router;