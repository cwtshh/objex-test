const express = require('express');
const router = express();

// rota de teste
router.get('/', (req, res) => {
    res.send('API funcionando!');
});

router.use("/students", require('./StudentRoutes'));
router.use("/groups", require('./GroupRoutes'));
router.use("/file", require('./FileRoutes'));
router.use("/image", require('./ImageRoutes'));
router.use("/code", require('./CodeRoutes'));



module.exports = router;