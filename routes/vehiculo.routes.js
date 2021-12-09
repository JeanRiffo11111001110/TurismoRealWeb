const {Router} = require('express');
const vehiculos = require('../controllers/vehiculos.js');
const { verifyToken } = require('../middlewares/authJwt.js');
const router = Router();

router.route('/vehiculos/:id?')
    .get(verifyToken,vehiculos.get)

module.exports = router;