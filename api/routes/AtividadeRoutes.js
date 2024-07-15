const express = require('express');
const router = express();

const {
    get_all_atividades,
    get_by_id
} = require('../controller/AtividadesController');

router.get('/', get_all_atividades);
router.get('/:id', get_by_id);

module.exports = router;
