const {Router} = require('express');
const departamentos = require('../controllers/departamentos.js');
const router = Router();

router.route('/departamentos/:id?')
    .get(departamentos.get);

module.exports = router;