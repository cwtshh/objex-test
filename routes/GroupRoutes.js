const express = require('express');
const router = express();

const { create_group, add_student, remove_student, get_groups } = require('../controllers/GroupController');

router.get('/', (req, res) => {
    res.send('Group');
});

router.post('/create', create_group);
router.post('/add', add_student);
router.post('/remove', remove_student);
router.get('/get', get_groups);

module.exports = router;